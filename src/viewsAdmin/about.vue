<template>
    <n-layout-header class="opera-header">
        <n-button type="primary" @click="addModal">新增</n-button>
    </n-layout-header>
    <rich-content></rich-content>
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
                            <template v-if="currentType == 'mainblock'">
                                <n-form-item label="描述">
                                    <n-input type="text" v-model:value="item.welcomeDescribe" placeholder="请输入欢迎描述" />
                                </n-form-item>
                                <n-form-item label="标题">
                                    <n-input type="text" v-model:value="item.title" placeholder="请输入页面标题" />
                                </n-form-item>
                                <n-form-item label="二维码1">
                                    <n-input type="text" v-model:value="item.QRCode1Tip" placeholder="请输入二维码1提示" />
                                    <n-upload :default-upload="false" @change="customRequestQR($event, idx, 'QRCode1')"
                                        accept=".jpg,.png,.jpeg" style="width: 120px" :show-file-list="false">
                                        <n-button>
                                            {{ item.QRCode1 ? '重新上传' : '上传图片' }}
                                        </n-button>
                                    </n-upload>
                                </n-form-item>
                                <n-form-item label="二维码2">
                                    <n-input type="text" v-model:value="item.QRCode2Tip" placeholder="请输入二维码2提示" />
                                    <n-upload :default-upload="false" @change="customRequestQR($event, idx, 'QRCode2')"
                                        accept=".jpg,.png,.jpeg" style="width: 120px" :show-file-list="false">
                                        <n-button>
                                            {{ item.QRCode2 ? '重新上传' : '上传图片' }}
                                        </n-button>
                                    </n-upload>
                                </n-form-item>
                                <n-form-item label="主要信息">
                                    <n-input type="text" v-model:value="item.mainInfo" placeholder="请输入主要信息" />
                                </n-form-item>
                            </template>
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
import richContent from "@/components/richContent/index.vue";
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
            return [h(
                NButton,
                {
                    size: 'small',
                    type: "warning",
                    style: "margin: 0 5px",
                    onClick: () => {
                        addModal();
                        const rowJson = row.json;
                        currentType.value = row.type;
                        /** @type {any} */
                        let submitI18n = {};
                        editId.value = row.id;
                        if (row.type == "seoblock") {
                            langList.forEach((elem) => {
                                SEOForm.forEach((el) => {
                                    el.value = rowJson[elem.lang][el.key];
                                });
                                submitI18n[elem.text] = JSON.parse(JSON.stringify(SEOForm))
                            });
                        } else if (row.type == "mainblock") {
                            langList.forEach((elem) => {
                                submitI18n[elem.text] = [rowJson[elem.lang]]
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
                                POST("adminAbout/deleteData", {
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
        label: "主要内容",
        value: "mainblock"
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

const customRequestQR = (e, lang, type) => {
    const file = e.file;
    const sendData = new FormData();
    sendData.append(file.name, file.file);

    uploadFile("upload/uploadImage", sendData).then((res) => {
        let formDataVal = formData.value;
        formDataVal[lang][0][type] = res.data.data.url;
        formData.value = formDataVal;
    })
}


const addModal = () => {
    editId.value = "";
    currentType.value = "seoblock";
    modalShowStatus.value = true;
};


const selectTypeChange = (/** @type {any} */ e) => {
    /** @type {any} */
    let submitI18n = {};
    editId.value = "";
    switch (e) {
        case "seoblock":
            langList.forEach((elem) => {
                submitI18n[elem.text] = JSON.parse(JSON.stringify(SEOForm))
            });
            break;
        case "mainblock":
            langList.forEach((elem) => {
                submitI18n[elem.text] = JSON.parse(JSON.stringify(mainFrom))
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

const mainFrom = [
    {
        welcomeDescribe: "",
        title: "",
        mainInfo: "",
        QRCode1: "",
        QRCode1Tip: "",
        QRCode2: "",
        QRCode2Tip: ""
    }
];

const resetData = () => {
    pagination.page = 1;
    getData();
}


const getData = () => {
    GET("adminAbout/getData", {
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
    } else if (currentType.value == "mainblock") {
        Object.keys(formData.value).map((elem) => {
            let obj = null;
            Object.entries(formData.value[elem]).forEach((el) => {
                obj = JSON.parse(JSON.stringify(el[1]))
            });
            sendObj[langObj[elem]] = obj;
        });
    };

    if (editId.value && editId.value !== 0) {
        POST("adminAbout/updateData", {
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
        POST("adminAbout/addData", {
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