<template>
  <v-container style="max-width:70%">
    <div>
      <v-file-input v-model="file" accept=".csv" label="File Input" truncate-length="50" small-chips outlined counter show-size color="teal accent-3"/>
      <v-btn @click="uploadFile" class="float-right" outlined color="teal lighten-1" v-if="upload == false">upload</v-btn>
      <v-text-field loading disabled color="success" v-else />
    </div>
    <UploadList :list="list" :tid="tid"/>
  </v-container>
</template>

<style>
  .myContainer {
    max-width : 80%
  }
</style>

<script>
import UploadList from '@/components/UploadList';
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  name: 'upload_page',
  components : {
    UploadList
  },
  data: () => {
    return {
      file : null,
      data : '',
      upload : false,
      tid : null,
      list : [],
    }
  },
  methods : {
    uploadFile() {
      if (this.file == null) {
        return;
      }this.upload = true;

      const reader = new FileReader();
      reader.readAsText(this.file);
      reader.onload = () => {
        this.data = reader.result;
        axios.post('/upload',{data: this.data}).then(res => {
          const data = res.data;
            this.list = data;
            this.tid = data[0].tid;
            this.upload = false;
        });
      }
    }
  },
}
</script>