# Book from markdown

　Book from markdownとは文字通り、markdownから書籍を作るためのシステムです。mdbookの特徴は次のとおりです。

* markdownが原稿
* Node.jsのみ使用
* CSS組版
* PDF出力

## markdown

　markdownは簡素なマークアップ言語です。markdownは方言が多く、各方面で細かい点が合わないと嫌われることもあります、本システムのmarkdownはmarked.jsを処理系に使用し、githubのmarkdown記法に類似し、組版のために次の拡張を行っています。

* 図・表・リスト番号の自動挿入
   * 図・表・リスト番号の相互参照
* 改ページのマークを追加

## Node.js

　Node.jsはJavaScript環境です。以前、構築した組版システムではSimpleHTTPServerを起動するためだけにPythonを使用していましたがmdbookではPythonを排除しました。Node.jsのみにしたために、処理の流れはすっきりしました。

## CSS組版

　本組版はVivlioStyleを使用してWebブラウザ（Chrome）に表示された結果をPDF化します。

## PDF出力

　出力はPDFになり、そのまま印刷所に入稿することができます。PDFのプロパティ情報も追加することができます。

=====

## 環境構築

　本書では次の環境を想定しています。

* Ubuntu 20.04LTS
* Node.js v14.8.0
   * puppeteer 5.2.1

### Node.jsのインストール

インストールはaptを使用しません。

次のようにcurlを使ってsetupスクリプトを実行します。

```txt:Node.jsのセットアップ
$ curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
```

念の為にapt updateしておきます。

```txt:aptのupdate
$ sudo apt update
$ sudo apt upgrade
```

aptコマンドでnodejsをインストールします。

```txt:Node.jsのインストール
$ sudo apt install nodejs
```

## mdbookのダウンロード

　まず、mdbookをgithubから次のようにcloneまたはダウンロードします。

```txt:ダウンロード
$ git clone http://github.com/aquaxis/mdbook.git
```

## 環境のセットアップ

　mdbookをダウンロードしたらセットアップを行います。

```txt:puppeteerとjsdomのインストール
$ make setup
```

　このセットアップではNode.jsのpuppeteerとjsdom、pdf-designer.jsとVivlioStyleをインストールします。

=====

![桜の写真](./images/image02.jpg)

=====


　[](###表の例)にここまでで紹介したJTAGプローブ一覧の価格などを紹介します。

```txt:表の例
```

| 項目 | 単価 | 個数 | 合計 |
|-----|-----|----:|----:|
| りんご | 150円 | 10個 | 1,500円 |
| ばなな | 100円 |  5個 | 500円 |

=====

　

　

　

　

　

　

　

　

　

　

　

　

　

　

　

　

　

```txt
　コラム風に書くことも可能です。
```
