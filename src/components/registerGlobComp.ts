import type { App } from 'vue';
import { Button } from './Button';
import {
  Button as AntButton,
  Modal,
  Tag,
  Tooltip,
  Form,
  Input,
  Row,
  Col,
  Spin,
  Layout,
  Upload,
  Switch,
  Table,
  Divider,
} from 'ant-design-vue';

export function registerGlobComp(app: App) {
  app
    .use(Input)
    .use(Button)
    .use(AntButton)
    .use(Layout)
    .use(Upload)
    .use(Modal)
    .use(Form)
    .use(Input)
    .use(Row)
    .use(Col)
    .use(Tag)
    .use(Tooltip)
    .use(Spin)
    .use(Switch)
    .use(Table)
    .use(Divider);
}
