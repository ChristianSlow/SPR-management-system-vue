import './assets/base.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import {
  Toolbar,
  Splitter,
  SplitterPanel,
  ConfirmationService,
  DialogService,
  ToastService,
  DataTable,
  Column,
  ColumnGroup,
  Row,
  InputText,
  IconField,
  InputIcon,
  Textarea,
  RadioButton,
  Select,
  Avatar,
  AvatarGroup,
  ScrollPanel,
  SelectButton,
  Drawer,
  Menu,
  Carousel,
  InputNumber,
  DatePicker,
  Paginator,
  TieredMenu,
  FloatLabel,
  Message,
  FileUpload,
  Popover,
  Tag,
  Dialog,
  Button,
  Password,
  Image,
  InputGroup,
  InputGroupAddon,
  Badge,
  OverlayBadge,
  OrderList,
} from 'primevue'
import { VueFire, VueFireAuth } from 'vuefire'
import { firebaseApp } from './firebase/config'

const app = createApp(App)

app.use(PrimeVue, {
  theme: 'none',
  options: {
    darkModeSelector: '.my-app-dark',
  },
})

app.use(VueFire, {
  firebaseApp,
  modules: [VueFireAuth()],
})

// component here:
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Toolbar', Toolbar)
app.component('Splitter', Splitter)
app.component('SplitterPanel', SplitterPanel)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('InputText', InputText)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Textarea', Textarea)
app.component('RadioButton', RadioButton)
app.component('Select', Select)
app.component('Avatar', Avatar)
app.component('AvatarGroup', AvatarGroup)
app.component('ScrollPanel', ScrollPanel)
app.component('SelectButton', SelectButton)
app.component('Drawer', Drawer)
app.component('Menu', Menu)
app.component('Carousel', Carousel)
app.component('InputNumber', InputNumber)
app.component('DatePicker', DatePicker)
app.component('Paginator', Paginator)
app.component('Tag', Tag)
app.component('TieredMenu', TieredMenu)
app.component('Popover', Popover)
app.component('FileUpload', FileUpload)
app.component('Message', Message)
app.component('FloatLabel', FloatLabel)
app.component('Password', Password)
app.component('Image', Image)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Badge', Badge)
app.component('OverlayBadge', OverlayBadge)
app.component('OrderList', OrderList)

app.use(createPinia())
app.use(router)
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)

app.mount('#app')
