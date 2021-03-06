(function() {
  const msgs = []
  document.getElementById('js_1').childNodes.forEach((node, idx) => {
    // check if it's a time node!
    if (node.tagName === 'H4') {
      msgs.push({ author: 'time', content: node.innerText })
      return 
    }

    let msg = { content: [] }
    
    msg.author = node.innerText.split('\n')[0] === 'Adam'
      ? 'adam'
      : 'other'

    node.querySelectorAll('[class*="direction_"').forEach(node => {
      const isRtl = node.className.includes('rtl')

      // voice message
      const voiceMsgNode = node.querySelector('[aria-label="Voice Message"]')
      if (voiceMsgNode) {
        msg.content.push({ type: 'voiceMsg', duration: voiceMsgNode.innerText.trim(), isRtl })
        return
      }

      // like sticker
      const likeSticker = node.querySelector('[data-testid=sticker] svg')
      if (likeSticker) {
        msg.content.push({ type: 'likeSticker' })
        return
      }

      // sticker
      const stickerNode = node.querySelector('[data-testid=sticker]')
      if (stickerNode) {
        msg.content.push({
          type: 'sticker',
          style: `background-image: ${stickerBackgroundImage(stickerNode.style['background-image'])}; background-repeat: no-repeat; background-size: 120px 120px; height: 120px; width: 120px;`,
        })
        return
      }

      // image
      const imageNode = node.querySelector('[role=presentation]')
      if (imageNode) {
        msg.content.push({ type: 'image', src: imageNode.querySelector('img').src, isRtl })
        return
      }

      // pure emoticon msg
      const pureEmoticonNode = node.querySelector('._1ift._1ifu.img')
      if (pureEmoticonNode) {
        msg.content.push({ type: 'emoticon', alt: pureEmoticonNode.alt, src: pureEmoticonNode.src, isRtl })
        return
      }

      // msg with html (**bold** _italics_ ~strike~ <a>)
      const textWithHtml = node.querySelector('._aok span b') || node.querySelector('._aok span i') || node.querySelector('._aok span s') || node.querySelector('._aok span a');
      if (textWithHtml) {
        msg.content.push({ type: 'textWithHtml', html: textWithHtml.parentNode.innerHTML, isRtl })
        return
      }

      // msg with emoticon
      const textWithEmoticonNode = node.querySelector('._aok span span')
      if (textWithEmoticonNode) {
        msg.content.push({ type: 'textWithEmoticon', html: textWithEmoticonNode.innerHTML, isRtl })
        return
      }

      // pure text
      msg.content.push({ type: 'text', html: node.innerText, isRtl })
    })
    msgs.push(msg)
  })

  prompt('', JSON.stringify(msgs))

  function stickerBackgroundImage(imageFbUrl) {
    if (imageFbUrl.match(443281065778538)) { return 'url(http://res.cloudinary.com/goldylucks/image/upload/v1504165088/stickers/sticker-crock-magic.png)' }
    if (imageFbUrl.match(126362187548578)) { return 'url(http://res.cloudinary.com/goldylucks/image/upload/v1504164954/stickers/sticker-tounge.png)' }
  }
  
}())
