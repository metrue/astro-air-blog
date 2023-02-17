import { defineConfig } from 'astro/config';
import { visit } from 'unist-util-visit'
import addClasses from 'rehype-add-classes';



function pip() {
  return [

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
          node.value = `<div class="pagebody text component"><div class="component-content code"> ${node.value} </div></div>`
          // node.value = node.value.replace(/astro-code/g, 'astro-code')
        }
      });
    },


    () => (tree) => {
      for(let i=0;i<tree.children.length;i++) {
        let node = tree.children[i];
        if(node.type === "element" && ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
    
          let next = tree.children[i + 1];
          let nodes = [node];
          while (next && !['figure'].includes(next.tagName) && next.type !="raw") {
  
            nodes.push(next);
            next = tree.children[tree.children.indexOf(next) + 1];
          }

          if (nodes.length > 1) {
            // rename label
            nodes.forEach((node) => {
              if(node.tagName === "p") {
                node.properties.className = ['pagebody-copy'];
                node.tagName = "div";
              }
              if(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(node.tagName)) {
                node.properties.className = ['pagebody-header'];
              }
            });

            tree.children.splice(i, nodes.length, {
              type: 'element',
              tagName: 'div',
              properties: { className: ['pagebody  text component'] },
              children: [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: { className: ['component-content'] },
                  children: nodes
                }
              ]
            });
          }
        }
      }
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
