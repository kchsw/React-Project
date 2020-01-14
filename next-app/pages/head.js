import Head from 'next/head'
import '../public/head.css'
//安装babel-plugin-import 按需引入
export default () =>
  <div>
    <Head>
      <title>My page title</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <p className="my-head">Hello world!</p>
  </div>