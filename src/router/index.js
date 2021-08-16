import Vue from 'vue';
import Router from 'vue-router';

//사용할 컴포넌트들을 가져온다.
import Upload from '@/views/UploadPage';
import List from '@/views/ListPage';
import Test from '@/views/Upload_List';
Vue.use(Router); //vue가 SPA를 위해 라우팅을 사용하겠다는 뜻

//주소와 매칭되는 컴포넌트 들을 여기에 적어줘야 한다.
export default new Router({
  mode:'history',
  routes:[
    {
      path: '/upload',
      name: 'upload_page',
      component: Upload
    },
    {
      path: '/list',
      name: 'list_page',
      component: List
    },
    {
      path: '/test',
      name: 'test_page',
      component: Test
    }
  ]
});