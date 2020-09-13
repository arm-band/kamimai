# Kamimai(紙舞)

`markdown-pdf`を自動実行し、pdfのプレビューを表示するボイラープレート

## 経緯

Markdownファイルを修正する度に`markdown-pdf`コマンドを実行するのが面倒なので、自動化できないかと考えました。

そこで、

- Markdownファイルを追加・修正した際に`markdown-pdf`コマンドを自動で実行
- 生成されたpdfファイルを表示確認
    - pdfファイルを直接開くと、`markdown-pdf`コマンドがコケるので「pdf埋め込みページを表示」という形で現象を回避

させることにしました。

## Kamimaiの由来

Kamimai(紙舞)とは、昭和初期の民俗学者・藤沢衛彦の著書『妖怪画談全集 日本篇 上』に記述が見られる妖怪です。その特徴は、

- 神無月(10月)に現れる
- 紙がひとりでに1枚ずつ舞い飛ぶ

というものです。

紙がひとりでに舞うように、ドキュメントを自動的に生成するということでこの妖怪の名前を使用しました。

## 使い方

### 使用手順

1. `git clone <REPOSITORY_TEMPLATE_URL.git>`でリポジトリのクローンを作成
2. リポジトリ名でディレクトリが作成されるので、ディレクトリ名をプロジェクト名に変更
3. `git clone`するとリモートリポジトリがテンプレート元のパスのままなので、変更する
    1. `git remote rm origin <REPOSITORY_TEMPLATE_URL.git>`で現在のリモートリポジトリを削除
    2. `git remote add origin <REPOSITORY_PROJECT_URL.git>`でプロジェクトのリモートリポジトリを追加
4. `npm i -D`(`npm install --save-dev`のショートカット)で必要なプラグインを揃える
5. `npm start`で初期設定を行うと、`gulp`も実行されます。`browser-sync`により、既定のブラウザでページを表示します
    - 生成されたディレクトリ・ファイルは`npm run budayu`で削除できます

## 機能

1. `markdown-pdf`により、下記`config.yml`の`param.src`に記述されたパスにある全てのMarkdownファイルを同ファイルの`param.dist`にPDFとして出力します。
2. ejs, scss, jsをコンパイルして`dist`ディレクトリ以下にWebページを生成します。このWebページ内に`PDFObject`でPDFを埋め込んで表示します。
3. MarkdownファイルやMarkdown用のscssファイルを修正すると、自動で再変換を行います。これにより、表示を確認しながらPDf資料を作成できます。
4. PDFが完成したら、`gulp`の`default`タスクを終了し、`gulp mallet`として最終結果を`results`ディレクトリ以下に生成します。

## 機能2

### チェックリスト的なもの

`src/md/scss/style.scss`で`em {float: right; }`としているので、□を`*□*`というように囲ってあげると、チェックリストとして使用できます(`munida.md`を参照)。


## 設定

- yamlファイル
    - `config.yml`
        - `commons`:
            - `sitename`: サイト名。タイトルタグやヘッダのブランドなどに使われます
            - `description`: 説明。タイトルタグの中で使います
            - `year`: 年数。フッタのコピーライトで使います
            - `author`: 作者名。フッタのコピーライトで使います
        - `param`:
            - `src`: 変換元のMarkdownファイルがあるパス
                - プロジェクトのルートディレクトリからの相対パスで記述
            - `dist`:  変換後のPDFファイルを出力するパス
                - プロジェクトのルートディレクトリからの相対パスで記述。
                - 初期状態では存在しないパスの場合、予めnpm scriptsなどで生成しておくこと

## リリースノート

- 2020/9/13 ver0.14.2
    - npmパッケージをアップデート
    - `gulp-notify`のnotify追加
    - `gulp-watch`を廃止して`gulp.watch`に切り替え
- 2019/10/29 ver0.14.1
    - npmパッケージをアップデート
- 2019/10/29 ver0.14.0
    - Gulpタスクを4.x系の書き方に修正
- 2019/7/8 ver0.13.1
    - Markdownに適用するScssを修正
- 2019/6/21 ver0.13.0
    - npmパッケージをアップデート
    - ファイルコピーの`npm scripts`を`copyfiles`から`cpx`に変更
    - `readm.emd`修正
- 2019/2/8 ver0.12.0
    - `npm scripts`を整理
    - gulpタスクを分割・整理
        - gulpタスクの記述をより新しい構文に変更
- 2018/12/12 ver0.11.1
    - gulpのバージョン指定方法を変更
- 2018/9/5 ver0.11.0
    - 諸々の設定パラメータの記述を、jsonファイル`src/data/variables.json`からyamlファイル`src/config/config.yml`に変更。汎用データではなく、設定ファイルだけになったので格納ディレクトリ名も変更。
- 2018/9/5 ver0.10.0
    - mdファイルを`src/data/pdfdata.json`に列挙せずに、自動的にmdファイルを取得して処理するように`gulpfie.js`を修正
- 2018/8/20 ver0.9.5
    - `gulpfie.js`修正
        1. `gulp mallet`時のパスの誤り修正
        2. mdに使用している画像が変更された場合も自動リロードが発火するように修正
- 2018/8/15 ver0.9.4
    - scssを調整
- 2018/8/15 ver0.9.3
    - Markdown用のスタイルシートをcssからscssに変更
        - scssからcssを生成した後にMarkdownをPDF化するので、きちんとスタイルは反映されます
    - [Yaku Han JP](https://qrac.github.io/yakuhanjp/)をインポートするように改修
- 2018/8/15 ver0.9.2
    - `gulp`のバージョンを4にアップデート
        - `gulpfile.js`をいろいろ修正
    - チェックリスト用のcssがあることを追記。併せてサンプルmd内を整理
- 2018/8/15 ver0.9.1
    - 最終出力
        - コマンドを`gulp mallet`に変更
        - `gulpfile.js`のパスが間違えていたので修正
    - `src/md/css/style.css`を書き換えたら自動リロードが走るように`gulpfile.js`を修正
    - サンプルmd内を少し整理
- 2018/8/1 ver0.9.0
    - 画像出力に対応(プロジェクトのルートディレクトリからの相対パスを書けば良い)
    - 諸々整理
- 2018/8/1 ver0.7.0
    - `npm run budayu`で生成結果を削除するコマンドを実装
- 2018/8/1 ver0.6.0
    - `inou`タスクも完成
- 2018/8/1 ver0.5.0
    - `default`タスクは完成
    - cssを読み込むようにオプションを追加
    - HTMLタグもパー啜るようにオプションを追加
- 2018/7/31 ver0.0.1
    - まだ途中
