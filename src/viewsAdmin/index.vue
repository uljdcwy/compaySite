<template>
    <n-layout-header class="opera-header">
        <n-button type="primary" @click="addModal">新增</n-button>
    </n-layout-header>
    <n-layout-content content-style="padding: 24px;">
        <n-data-table remote :columns="columns" :data="tableData" :pagination="pagination" :bordered="false" />
    </n-layout-content>
    <n-modal preset="card" v-model:show="modalShowStatus" title="新增内容块" style="width: 500px">

        <n-form ref="formRef" label-placement="left" :label-width="80" :model="formData">
            <n-form-item label="类型">
                <n-select @update:value="selectTypeChange" v-model:value="currentType" :options="selectTypes" />
            </n-form-item>
            <n-tabs animated justify-content="space-evenly" type="line">
                <template v-for="(itemFrom, idx) in formData">
                    <n-tab-pane :name="idx" :tab="idx">
                        <template v-for="(item, idxChild) in itemFrom">
                            <n-form-item v-if="currentType == 'seoblock'" :label="item.label">
                                <n-input :type="item.type || 'text'" v-model:value="item.value"
                                    :placeholder="item.placeholder" />
                            </n-form-item>
                            <n-form-item v-if="currentType == 'bannerblock'" :label="'轮播图' + idxChild">
                                <n-input type="text" v-model:value="item.alt" placeholder="请输入banner图提示" />
                                <n-upload :default-upload="false" @change="customRequest($event, idx, idxChild)"
                                    accept=".jpg,.png,.jpeg" style="width: 120px" :show-file-list="false">
                                    <n-button>
                                        {{ item.imageUrl ? '重新上传' : '上传图片' }}
                                    </n-button>
                                </n-upload>
                            </n-form-item>
                            <n-form-item v-if="currentType == 'countblock'" :label="'计数值' + idxChild">
                                <n-input-number min="0" v-model:value="item.countNum" placeholder="计数值" style="width: 240px;text-align: center;" />
                                <n-input type="text" style="width: 160px;text-align: center;" v-model:value="item.unit" placeholder="单位" />
                                <n-input type="text" v-model:value="item.describe" placeholder="请选择描述内容" />
                                <n-upload :default-upload="false" @change="customRequest($event, idx, idxChild)"
                                    accept=".jpg,.png,.jpeg" style="width: 120px" :show-file-list="false">
                                    <n-button>
                                        {{ item.imageUrl ? '重新上传' : '上传图片' }}
                                    </n-button>
                                </n-upload>
                            </n-form-item>
                        </template>
                    </n-tab-pane>
                </template>
            </n-tabs>
            <n-el tag="div" class="form-btns">
                <n-button @click="closeModal" class="form-btn">
                    取消
                </n-button>
                <n-button @click="submitContent" type="primary" attr-type="button" class="form-btn">
                    保存
                </n-button>
            </n-el>
        </n-form>
    </n-modal>
</template>
<script setup>
import { ref, h, reactive, onMounted } from "vue";
import { langList } from "@/vueI18n/data.js";
import { POST, GET, uploadFile } from "@/http/index.js";
import { CloudUploadOutline, AddCircle, RemoveCircleSharp } from '@vicons/ionicons5'
import { NLayoutContent, NLayoutHeader, NEl, NDataTable, NButton, NModal, NForm, NFormItem, NInput, NTabs, NTabPane, NSelect, NDynamicInput, NIcon, NUpload, NInputNumber } from "naive-ui";

const columns = [
    {
        title: '类型',
        align: "center",
        key: 'typeName'
    },
    {
        title: "操作",
        width: 200,
        align: "center",
        render: (/** @type {any} */ row, /** @type {any} */ index) => {
            console.log(row, "row")
            return [h(
                NButton,
                {
                    size: 'small',
                    type: "warning",
                    style: "margin: 0 5px",
                    onClick: () => {
                        addModal();
                        const rowJson = row.json;
                        let defaultLang = Object.keys(rowJson)[0];
                        if(decodeURIComponent(rowJson[defaultLang]) != rowJson[defaultLang] && (typeof rowJson[defaultLang]) == 'string'){
                            Object.keys(rowJson).map((el) => {
                                rowJson[el] = JSON.parse(decodeURIComponent(rowJson[el]));
                            })
                        }

                        console.log(rowJson,"rowJson")

                        currentType.value = row.type;
                        let submitI18n = {};
                        editId.value = row.id;
                        if (row.type == "seoblock") {
                            langList.forEach((elem) => {
                                SEOForm.forEach((el) => {
                                    el.value = rowJson[elem.lang][el.key];
                                });
                                submitI18n[elem.text] = JSON.parse(JSON.stringify(SEOForm))
                            });
                        } else {
                            langList.forEach((elem) => {
                                submitI18n[elem.text] = rowJson[elem.lang]
                            });
                        };
                        formData.value = submitI18n;
                    }
                },
                { default: () => '编辑' }
            ), h(
                NButton,
                {
                    size: 'small',
                    type: "error",
                    style: "margin: 0 5px",
                    onClick: () => {

                        window.dialog.warning({
                            title: '删除',
                            content: "点击确认删除当前块",
                            positiveText: '确定',
                            negativeText: '取消',
                            onPositiveClick: () => {
                                POST("adminIndex/deleteData", {
                                    id: row.id
                                }).then((res) => {
                                    if (res.data.code == "1") {
                                        resetData();
                                        window.message.success("删除成功");
                                    } else {
                                        window.message.error(res.data.msg || "删除失败");
                                    }
                                });
                            },
                            onNegativeClick: () => {
                            }
                        })
                    }
                },
                { default: () => '删除' }
            )]
        }
    }
];

const currentType = ref();

const editId = ref();

const formData = ref();

const selectTypes = [
    {
        label: "seo 内容块",
        value: "seoblock"
    },
    {
        label: "轮播图内容块",
        value: "bannerblock"
    },
    {
        label: "计数器内容块",
        value: "countblock"
    }
];

const formRef = ref();

const modalShowStatus = ref(false);

const pagination = reactive({
  page: 1,
  pageSize: 10,
  itemCount: 0,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page) => {
    pagination.page = page;
    getData();
  },
  onUpdatePageSize: (pSize) => {
    pagination.page = 1;
    pagination.pageSize = pSize;
    getData();
  }
});

const tableData = ref([]);

const customRequest = (e, lang, idx) => {
    const file = e.file;
    const sendData = new FormData();
    sendData.append(file.name, file.file);

    uploadFile("upload/uploadImage", sendData).then((res) => {
        let formDataVal = formData.value;
        formDataVal[lang][idx].imageUrl = res.data.data.url;
        formData.value = formDataVal;
    })
}


const addModal = () => {
    editId.value = "";
    currentType.value = "seoblock";
    modalShowStatus.value = true;
};


const selectTypeChange = (/** @type {any} */ e) => {
    let submitI18n = {};
    editId.value = "";
    switch (e) {
        case "seoblock":
            langList.forEach((elem) => {
                submitI18n[elem.text] = JSON.parse(JSON.stringify(SEOForm))
            });
            break;
        case "bannerblock":
            langList.forEach((elem) => {
                submitI18n[elem.text] = JSON.parse(JSON.stringify(bannerFrom))
            });
            break;
        case "countblock":
            langList.forEach((elem) => {
                submitI18n[elem.text] = JSON.parse(JSON.stringify(countFrom))
            });
            break;
    };
    formData.value = submitI18n;
};
const SEOForm = [
    {
        label: "标题",
        key: "title",
        placeholder: "请输入页面标题",
        value: "",
        type: "text"
    },
    {
        label: "作者",
        key: "author",
        placeholder: "请输入作者",
        value: "",
        type: "text"
    },
    {
        label: "关键字",
        key: "keywords",
        placeholder: "请输入关键字列表",
        value: "",
        type: "text"
    },
    {
        label: "页面描述",
        key: "description",
        placeholder: "请输入页面描述内容",
        value: "",
        type: "textarea"
    }
];

const bannerFrom = [
    {
        alt: "",
        imageUrl: ""
    },
    {
        alt: "",
        imageUrl: ""
    },
    {
        alt: "",
        imageUrl: ""
    },
    {
        alt: "",
        imageUrl: ""
    }
];


const countFrom = [
    {
        countNum: "",
        imageUrl: "",
        unit: "",
        describe: ""
    },
    {
        countNum: "",
        imageUrl: "",
        unit: "",
        describe: ""
    },
    {
        countNum: "",
        imageUrl: "",
        unit: "",
        describe: ""
    },
    {
        countNum: "",
        imageUrl: "",
        unit: "",
        describe: ""
    }
];

const resetData = () => {
    pagination.page = 1;
    getData();
}


const getData = () => {
    GET("adminIndex/getData", {
        pageIndex: pagination.page - 1,
        pageSize: pagination.pageSize
    }).then((res) => {
        let data = res.data.data;
        pagination.itemCount = data.count;
        data.forEach((/** @type {{ typeName: any; type: string | number; langName: any; lang: string | number; }} */ el) => {
            el.typeName = typeObj[el.type];
        });
        tableData.value = data || [];
    })
}

/**
 * @type {any}
 */
const typeObj = {};
/**
 * @type { any }
 */
const langObj = {};

onMounted(() => {
    selectTypes.forEach((elem) => {
        typeObj[elem.value] = elem.label;
    });

    let submitI18n = {};

    langList.forEach((elem) => {
        langObj[elem.lang] = elem.text;
        langObj[elem.text] = elem.lang;
        submitI18n[elem.text] = JSON.parse(JSON.stringify(SEOForm))
    });
    formData.value = submitI18n;

    getData();
});

const submitContent = () => {

    const sendObj = {};
    if (currentType.value == "seoblock") {
        Object.keys(formData.value).map((elem) => {
            let obj = {};
            formData.value[elem].forEach((el) => {
                obj[el.key] = el.value;/** @type {{ key: string | number; value: any; }} */
            });
            sendObj[langObj[elem]] = obj;
        })
    } else if (currentType.value == "bannerblock" || currentType.value == "countblock") {
        Object.keys(formData.value).map((elem) => {
            let obj = []
            formData.value[elem].forEach((el) => {
                if (el.imageUrl) {
                    obj.push(el);
                }
            });
            sendObj[langObj[elem]] = encodeURIComponent(JSON.stringify(obj));
        })
    }
    if (editId.value && editId.value !== 0) {
        POST("adminIndex/updateData", {
            id: editId.value,
            type: currentType.value,
            json: sendObj
        }).then((res) => {
            if (res.data.code == "1") {
                resetData();
                closeModal();
                window.message.success("更新成功");
            } else {
                window.message.error(res.data.msg || "更新失败");
            }
        });
    } else {
        POST("adminIndex/addData", {
            type: currentType.value,
            json: sendObj
        }).then((res) => {
            if (res.data.code == "1") {
                resetData();
                closeModal();
                window.message.success("添加成功");
            } else {
                window.message.error(res.data.msg || "添加失败");
            }
        });
    }
}

const closeModal = () => {
    modalShowStatus.value = false;
}

</script>
<style lang="scss" scoped="scoped">
.opera-header {
    padding: 10px 20px;
    border-bottom: 1px solid #ccc
}

.form-btn {
    margin: 0 10px;
}

.form-btns {
    text-align: center;
}

.submit-box {
    text-align: center;
}
</style>
  