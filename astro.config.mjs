import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit'
import addClasses from 'rehype-add-classes';
import { select } from 'hast-util-select';
import rehypeWrap from 'rehype-wrap';



function pip() {
  return [
    // step 1: rebuild the image tag
    () => (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'p' && node.children[0].tagName === 'img') {
          node.tagName = 'figure';
          node.properties.className = ['image component image-big image-fullbleed body-copy-wide nr-scroll-animation nr-scroll-animation--on'];
          let img = node.children[0];

          node.children = [
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['component-content'] },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['image-sharesheet'] },
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: ['image image-asset'] },
                      children: [
                        {
                          type: 'element',
                          tagName: 'picture',
                          properties: { className: ['picture'] },
                          children: [
                            {
                              type: 'element',
                              tagName: 'img',
                              properties: {
                                src: img.properties.src,
                                alt: img.properties.alt,
                                className: ['picture-image'],
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['image-description'] },
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: ['image-caption'] },
                      children: [
                        {
                          type: 'text',
                          value: img.properties.alt
                        }
                      ]
                    },
                    {
                      type: 'element',
                      tagName: 'a',
                      properties: { className: ['icon-arrowdown icon nr-cta-download'], href: img.properties.src, download: true },
                    }
                  ]
                }
              ]
            }
          ]
        }
      })
    },

    () => (tree) => {
      tree.children.forEach((node) => {
        if (node.type === "raw") {
          node.value = `<precode class="pagebody text component"><div class="component-content"> ${node.value} </div></precode>`
          // node.value = node.value.replace(/astro-code/g, 'astro-code')
        }
      });
    },

    () => (tree) => {
      tree.children.push(
        {
          type: 'element',
          
        }
      )
    }
  ]
}


function pipeline() {

  return [
    // step 1: rename the tag which named p and don't have an image tag to pp.
    () => (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'p' && node.children[0].tagName != 'img') {
          node.tagName = 'pp'
        }
      })
    },

    // step 2: add class to pp tag
    [addClasses, { 'pp': 'pagebody-copy' }],


    // step 3: add div tag to pp tag
    () => (tree) => {
      let pNodes = [];
      tree.children.forEach((node) => {
        if (node.tagName === 'pp') {
          pNodes.push(node);
        } else {
          if (pNodes.length) {
            tree.children.splice(tree.children.indexOf(node), 0, {
              type: 'element',
              properties: { className: ['pagebody text component'] },
              tagName: 'div',
              children: [{ type: 'element', tagName: 'div', properties: { className: ['component-content'] }, children: pNodes, }],
            });
            pNodes = [];
          }
        }
      });

      if (pNodes.length) {
        tree.children.push({
          type: 'element',
          properties: { className: ['pagebody text component'] },
          tagName: 'div',
          children: [{ type: 'element', tagName: 'div', properties: { className: ['component-content'] }, children: pNodes, }],
        });
      }
    },

    // step 4: remove pp tag
    () => (tree) => {
      // tree.children = tree.children.filter((node) => node.tagName !== 'pp');
    },

    // step 5: rename pp tag to p tag
    () => (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'pp') {
          node.tagName = 'p'
        }
      })
    },

    // step 6: rebuild the image tag
    () => (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'p' && node.children[0].tagName === 'img') {
          node.tagName = 'figure';
          node.properties.className = ['image component image-big image-fullbleed body-copy-wide nr-scroll-animation nr-scroll-animation--on'];
          let img = node.children[0];

          node.children = [
            {
              type: 'element',
              tagName: 'div',
              properties: { className: ['component-content'] },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['image-sharesheet'] },
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: ['image image-asset'] },
                      children: [
                        {
                          type: 'element',
                          tagName: 'picture',
                          properties: { className: ['picture'] },
                          children: [
                            {
                              type: 'element',
                              tagName: 'img',
                              properties: {
                                src: img.properties.src,
                                alt: img.properties.alt,
                                className: ['picture-image'],
                              }
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['image-description'] },
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: { className: ['image-caption'] },
                      children: [
                        {
                          type: 'text',
                          value: img.properties.alt
                        }
                      ]
                    },
                    {
                      type: 'element',
                      tagName: 'a',
                      properties: { className: ['icon-arrowdown icon nr-cta-download'], href: img.properties.src, download: true },
                    }
                  ]
                }
              ]
            }
          ]

        }
      })
    },
    () => (tree) => {
      tree.children.forEach((node) => {
        if (node.type === "raw") {
          node.value = `<div class="pagebody text component"><div class="component-content"> ${node.value} </div></div>`
          // node.value = node.value.replace(/astro-code/g, 'astro-code')
        }
      });
    }
  ]
}


// https://astro.build/config
export default defineConfig({
  markdown: {
    rehypePlugins: pip(),
    shikiConfig: {
      // Choose from Shiki's built-in themes (or add your own)
      // https://github.com/shikijs/shiki/blob/main/docs/themes.md
      theme: 'github-dark',
      // Add custom languages
      // Note: Shiki has countless langs built-in, including .astro!
      // https://github.com/shikijs/shiki/blob/main/docs/languages.md
      langs: [],
      // Enable word wrap to prevent horizontal scrolling
      wrap: true,
    },
  },
});
