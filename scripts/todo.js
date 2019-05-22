// Description:
//   TODO を管理することができるボットです
// Commands:
//   ボット名 todo     - TODO を作成
//   ボット名 done     - TODO を完了にする
//   ボット名 del      - TODO を消す
//   ボット名 list     - TODO の一覧表示
//   ボット名 donelist - 完了した TODO の一覧表示
'use strict';
const todo = require('todo');
module.exports = (robot) => {
  robot.respond(/todo (.+)/i, (msg) => {/**この部分は、 . が改行文字以外のどの 1 文字にもマッチする文字であり、 + は直前の文字の 1 回以上の繰り返しにマッチするという意味です。
    任意の文字の繰り返しなので、aaa も あいうえお もマッチします。 */
    const task = msg.match[1].trim();/**trim 関数は、 JavaScript の文字列の関数です。
    trim 関数は文字列の両端の空白を取り除いた文字列を取得する関数で、 ここではそれを task という変数に代入しています。 */
    todo.todo(task);
    msg.send('追加しました: ' + task);
  });

  robot.respond(/done (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.done(task);
    msg.send('完了にしました: ' + task);
  });

  robot.respond(/del (.+)/i, (msg) => {
    const task = msg.match[1].trim();
    todo.del(task);
    msg.send('削除しました: ' + task);
  });

  robot.respond(/list/i, (msg) => {
    const list = todo.list();
    if (list.length === 0){
      msg.send('(TODOはありません)');
    } else {
      msg.send(list.join('\n'));/**join 関数は、 配列の全ての要素を与えられた文字列で繋いで一つの文字列にする関数 
      \n という改行を表すエスケープシーケンスで結合しました。結果として、TODO の一覧が改行されて表示されます。*/
    }
  });

  robot.respond(/donelist/i, (msg) => {
    const donelist = todo.donelist();
    if(donelist.length === 0){
       msg.send('(完了したTODOはありません)');
    } else {
      msg.send(donelist.join('\n'));
    }
  });

};