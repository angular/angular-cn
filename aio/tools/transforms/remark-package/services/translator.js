const slugs = require('github-slugger')();

function mark(text) {
  text = addTranslationAttributes(text);

  text = addIdsToHn(text);

  return text;
}

function isTranslation(text) {
  return text && /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]/.test(text);
}

function addTranslationAttributes(text) {
  return text.replace(/<(h\d|header|p|section|t)(\b[\s\S]*?)>([\s\S]+?)<\/\1>/gi, function ($0, $1, $2, $3) {
    const suffix = isTranslation($3) ? 'result' : 'origin="off"';
    return `<${$1} translation-${suffix} ${$2}>${$3}</${$1}>`;
  });
}

function addIdsToHn(text) {
  return text.replace(/<(h\d) translation-origin="off" (?!\bid\b=)(.*?)>(.*?)<\/\1>\n<\1 translation-result (.*?)>(.*?)<\/\1>/gi,
    (_0, _1, _2, _3, _4, _5) => {
      const id = toId(_3);
      return `<${_1} translation-origin="off" ${_2}>${_3}</${_1}>\n<${_1} translation-result ${_4} id="${id}">${_5}</${_1}>`;
    });
}

function toId(text) {
  return slugs.slug(text);
}

module.exports = {
  mark,
  addTranslationAttributes,
  addIdsToHn,
};
