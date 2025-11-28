# 辞書アプリ
## 概要
IT系の用語を調べることができる辞書アプリです  
主な機能としては検索・予測変換・用語と説明の表示・内部リンク化などがあります  
用語はmicoroCMSで管理しています  
※作成にはChatGPTを使用しました  
[**サイトはこちら**](https://it-dict.vercel.app/)
## 使用技術
* Next.js（App Router)
* TypeScript
* Tailwind CSS
* CSS Modules
* ESLint
* npm
* React
## 使用API
[micoroCMS API](https://microcms.io/)  
コンテンツの作成や取得・管理などができる
## 製作期間
17日ほど
## 内容(スクリーンショット)
### トップページ（ app/(home)/page.tsx ）
![](https://github.com/itc-s24005/IT-DICT/blob/main/ScreenShot/Screenshot%20from%202025-11-28%2010-44-55.png?raw=true)
### 検索結果ページ（ app/(pages)/search/page.tsx ）
![](https://github.com/itc-s24005/IT-DICT/blob/main/ScreenShot/Screenshot%20from%202025-11-28%2010-51-57.png?raw=true)
### 用語ページ （ app/(pages)/term/[slug]/page.tsx ）
![](https://github.com/itc-s24005/IT-DICT/blob/main/ScreenShot/Screenshot%20from%202025-11-28%2010-52-47.png?raw=true)
## 機能について
### 検索機能（トップページ・ヘッダー共通）
入力した文字と一部一致しているものを予測変換の候補として表示します  
候補をマウスで直接クリックするか、上下キー（候補選択）とEnterキーで選択した用語ページを直接開けます  
また、検索バーの「検索」ボタンを押すか候補から選択せずにEnterキーを押せば検索結果ページを表示します
![](https://github.com/itc-s24005/IT-DICT/blob/main/ScreenShot/Screenshot%20from%202025-11-28%2011-06-32.png?raw=true)
### 内部リンク化  
用語ページの説明文内で用語ページが存在する用語は自動的に内部リンク化されます  
自動的なのでmicroCMS側（コンテンツ管理画面）でリンクの設定をする必要はありません
![](https://github.com/itc-s24005/IT-DICT/blob/main/ScreenShot/Screenshot%20from%202025-11-28%2011-16-07.png?raw=true)
