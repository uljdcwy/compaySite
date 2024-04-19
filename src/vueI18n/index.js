import { createI18n } from 'vue-i18n';
import { isClient } from '@/utils/utils.js';
import devData from '@/vueI18n/data.js';


/**
 * 
 * @param {string} lang 默认的语种 
 * @param {any} data 默认的数据
 * @returns 
 */
export const getI18n = (lang, data = null) => {
  let initData = data;

  if (isClient()) {
    initData = window._INIT_I18N_ || data;
    lang = window._INIT_LANG_;
  }

  if(process.env.NODE_ENV == "development") {
    initData = devData
  }

  return createI18n({
    locale: lang,
    allowComposition: true,
    messages: initData
  })
} 

export const getAdminI18n = () => {
  return createI18n({
    locale: "zh",
    allowComposition: true,
    messages: {
      zh: {
        test: "查看数据是否正常展示"
      }
    }
  })
}