/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data-explorer/edit.js"
/*!***********************************!*\
  !*** ./src/data-explorer/edit.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/data-explorer/block.json");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/data-explorer/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Recupera as traduções.
 */



/**
 * Hooks e componentes do Gutenberg.
 */




/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */


/**
 * Função de Edição do Bloco.
 */

function Edit({
  attributes,
  setAttributes
}) {
  const {
    title,
    contactText,
    contactUrl,
    items
  } = attributes;

  // Estado para rastrear qual item (0 a 5) está sendo editado na barra lateral
  const [activeItemIndex, setActiveItemIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_4__.useState)(0);

  // Função auxiliar para atualizar um item específico no array de atributos
  const updateItemProperty = (index, property, value) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [property]: value
    };
    setAttributes({
      items: newItems
    });
  };

  // Imagem que aparecerá no lado esquerdo do editor (a do item ativo)
  const currentImageUrl = items[activeItemIndex]?.imageUrl;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Configuração Principal", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("URL/Link de Contato", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
          value: contactUrl,
          onChange: val => setAttributes({
            contactUrl: val
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Texto do Botão de Contato", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
          value: contactText,
          onChange: val => setAttributes({
            contactText: val
          })
        })]
      }), items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
        title: `${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Botão", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain)} ${index + 1}: ${item.label || "Vazio"}`,
        initialOpen: index === activeItemIndex,
        onToggle: () => setActiveItemIndex(index) // Ativa este item na sidebar e no preview
        ,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Ícone SVG (Cole o código <svg>)", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Abra o arquivo SVG em um editor de texto e cole o código aqui.", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
          value: item.svg,
          onChange: val => updateItemProperty(index, "svg", val)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Texto do Botão", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
          value: item.label,
          onChange: val => updateItemProperty(index, "label", val)
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUploadCheck, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.MediaUpload, {
            onSelect: media => {
              updateItemProperty(index, "imageId", media.id);
              updateItemProperty(index, "imageUrl", media.url);
            },
            allowedTypes: ["image"],
            value: item.imageId,
            render: ({
              open
            }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
              isPrimary: true,
              onClick: open,
              icon: "images-alt",
              style: {
                marginTop: "10px",
                width: "100%",
                justifyContent: "center"
              },
              children: item.imageUrl ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Alterar Imagem", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain) : (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Adicionar Imagem", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain)
            })
          }), item.imageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Button, {
            isDestructive: true,
            isLink: true,
            onClick: () => {
              updateItemProperty(index, "imageId", 0);
              updateItemProperty(index, "imageUrl", "");
            },
            style: {
              marginTop: "10px"
            },
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Remover Imagem", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain)
          })]
        })]
      }, index))]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "data-explorer-editor-wrapper",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "preview-image-side",
          children: currentImageUrl ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("img", {
            src: currentImageUrl,
            alt: "Visualiza\xE7\xE3o Ativa"
          }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.Placeholder, {
            icon: "images-alt",
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Preview da Imagem", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain),
            instructions: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Selecione um botão à direita para ver ou adicionar sua imagem.", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain)
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
          className: "selection-side",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichText, {
            tagName: "h2",
            className: "main-title",
            value: title,
            onChange: val => setAttributes({
              title: val
            }),
            placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)("Insira o título aqui...", _block_json__WEBPACK_IMPORTED_MODULE_1__.textdomain)
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "grid-buttons",
            children: items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("button", {
              className: `item-card ${index === activeItemIndex ? "is-active" : ""}`,
              onClick: () => setActiveItemIndex(index),
              children: [item.svg && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
                className: "icon-wrapper",
                dangerouslySetInnerHTML: {
                  __html: item.svg
                }
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                children: item.label
              })]
            }, index))
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "contact-action wp-block-buttons",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
              className: "wp-block-button",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("a", {
                className: "wp-block-button__link wp-element-button",
                onClick: e => e.preventDefault(),
                style: {
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                },
                children: [contactText, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("span", {
                  className: "arrow",
                  "aria-hidden": "true",
                  style: {
                    display: 'flex'
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
                    width: "24",
                    height: "24",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                      d: "M9 7L14 12L9 17",
                      stroke: "white",
                      strokeWidth: "2",
                      strokeLinecap: "square"
                    })
                  })
                })]
              })
            })
          })]
        })]
      })
    })]
  });
}

/***/ },

/***/ "./src/data-explorer/index.js"
/*!************************************!*\
  !*** ./src/data-explorer/index.js ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/data-explorer/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/data-explorer/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/data-explorer/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/data-explorer/block.json");
/* harmony import */ var _icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../icons */ "./src/icons.jsx");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 */


/**
 * Internal dependencies
 */



 // Certifique-se que este arquivo existe no diretório pai

/**
 * Every block starts by registering a new block type definition.
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * O ícone é extraído do arquivo de ícones centralizado do seu tema/plugin.
   */
  icon: _icons__WEBPACK_IMPORTED_MODULE_5__["default"].primary,
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  /**
   * @see ./save.js
   */
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
});

/***/ },

/***/ "./src/data-explorer/save.js"
/*!***********************************!*\
  !*** ./src/data-explorer/save.js ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 */

function save({
  attributes
}) {
  const {
    title,
    contactText,
    contactUrl,
    items
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
    ..._wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps.save(),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "data-explorer-wrapper",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
        className: "image-display",
        children: items[0]?.imageUrl && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("img", {
          id: "main-feature-image",
          src: items[0].imageUrl,
          alt: "Data Explorer Preview"
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "controls-display",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h2", {
          className: "explorer-title",
          children: title
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "items-grid",
          children: items.map((item, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("button", {
            className: "item-card",
            "data-img": item.imageUrl // O view.js usa isso para trocar a imagem
            ,
            children: [item.svg && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
              className: "icon-wrapper",
              dangerouslySetInnerHTML: {
                __html: item.svg
              }
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
              children: item.label
            })]
          }, index))
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "contact-action wp-block-buttons",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            className: "wp-block-button",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("a", {
              href: contactUrl,
              className: "wp-block-button__link wp-element-button",
              style: {
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              },
              children: [contactText, /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("span", {
                className: "arrow",
                "aria-hidden": "true",
                style: {
                  display: 'flex'
                },
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("svg", {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("path", {
                    d: "M9 7L14 12L9 17",
                    stroke: "white",
                    strokeWidth: "2",
                    strokeLinecap: "square"
                  })
                })
              })]
            })
          })
        })]
      })]
    })
  });
}

/***/ },

/***/ "./src/icons.jsx"
/*!***********************!*\
  !*** ./src/icons.jsx ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  primary: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    id: "Layer_1",
    "data-name": "Layer 1",
    xmlns: "http://www.w3.org/2000/svg",
    version: "1.1",
    viewBox: "0 0 62 62",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      class: "cls-1",
      d: "M47.8,22.6h0v-3.7C47.8,8.7,39.4.4,29.2.4h-3.8C16,.4,8.2,7.4,7,16.5h-.2s0,2.5,0,2.5v36.6c0,3.3,2.7,6.1,6.1,6.1h13.3c.2,0,.4,0,.5,0h10.6c.1,0,.3,0,.4,0,.3,0,.7,0,1,0,.3,0,.6,0,.9,0l2-.2v-.2c8.9-1.9,15.6-9.9,15.6-19.4v-2.2c0-6.9-3.6-13.3-9.4-16.9ZM14.9,57.7h-2c-1.2,0-2.2-1-2.2-2.2v-2c0,0,.2.2.2.3.2.3.5.6.7.9,0,0,0,.1.1.2.9,1.1,2,2,3.1,2.9,0,0,0,0,0,0ZM25.4,4.3h3.8c8.1,0,14.7,6.6,14.7,14.7v1.8c-2.1-.7-4.3-1.1-6.6-1.1h-10.6c-1.2,0-2.8,0-4,.4-.9-.5-1.9-.8-3-1l-8.9-1.7c.9-7.3,7.1-12.9,14.5-12.9ZM10.8,37.8c0-.3,0-.6.1-.9,0-.2,0-.3,0-.5,0-.2,0-.5.2-.7,0-.2,0-.3.1-.5,0-.2.1-.5.2-.7,0-.2.1-.3.2-.5,0-.2.2-.4.2-.6,0-.2.1-.3.2-.5,0-.2.2-.4.3-.6,0-.2.2-.3.3-.5.1-.2.2-.4.3-.6,0-.2.2-.3.3-.5.1-.2.2-.4.4-.6.1-.2.2-.3.3-.4.1-.2.3-.3.4-.5.1-.1.2-.3.4-.4.2-.2.3-.3.5-.5.1-.1.3-.3.4-.4.2-.2.3-.3.5-.5.1-.1.3-.2.4-.4.2-.1.4-.3.5-.4.1-.1.3-.2.4-.3.2-.1.4-.3.6-.4.1,0,.3-.2.5-.3.2-.1.4-.2.7-.4.1,0,.3-.2.4-.2.2-.1.5-.2.8-.3.1,0,.3-.1.4-.2.4-.1.7-.3,1.1-.4,0,0,0,0,.1,0,.9.7,1.7,1.6,2.2,2.6l4.3,11.5H10.8s0,0,0,0c0-.1,0-.3,0-.4ZM43.8,25.1c0,.4-.1.7-.2,1.1,0,.1,0,.2,0,.4,0,.4-.2.8-.3,1.1,0,0,0,.2,0,.3-.1.4-.3.7-.4,1.1,0,0,0,.2,0,.2-.2.4-.3.7-.5,1,0,0,0,0,0,.1,0,.2-.2.3-.3.5,0,.1-.2.3-.2.4-1.8,2.8-4.5,5-7.6,6.1,0,0-.2,0-.2,0-.2,0-.4.1-.6.2-.2,0-.3,0-.5.1l-1.6-4.2-3.1-8.4h0c-.3-.7-.6-1.2-1-1.7h10.4c2.2,0,4.5.5,6.5,1.4,0,0,0,.2,0,.2ZM11.2,27.1c-.2.2-.3.4-.5.6v-6.6l6.1,1.2c-2.1,1.2-4.1,2.9-5.6,4.8ZM26.7,57.7c-7.1,0-13.2-4.7-15.3-11.2,0,0,0-.1,0-.2-.1-.4-.2-.8-.3-1.3,0-.1,0-.3,0-.5,0-.4-.1-.7-.2-1.1,0-.2,0-.4,0-.7,0-.2,0-.5,0-.7h18.5c.2,0,.3,0,.4,0v.2h.5c0,0,5.8,15.4,5.8,15.4h-7.8s-1.5,0-1.5,0ZM34.1,41.5c.2,0,.3,0,.5-.1,0,0,0,0,0,0,0,0,.1,0,.2,0,.2,0,.4-.1.6-.2.3-.1.6-.2.9-.3,0,0,0,0,0,0,0,0,0,0,.1,0,.1,0,.2,0,.3-.1.4-.2.8-.4,1.2-.6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2.5-1.4,4.6-3.2,6.2-5.5,1.6-2.2,2.6-4.6,3.1-7.2,3.6,3,5.8,7.6,5.8,12.3v2.2c0,7.9-5.7,14.4-13.2,15.7l-6-16Z"
    })
  })
});

/***/ },

/***/ "./src/data-explorer/editor.scss"
/*!***************************************!*\
  !*** ./src/data-explorer/editor.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/data-explorer/style.scss"
/*!**************************************!*\
  !*** ./src/data-explorer/style.scss ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/data-explorer/block.json"
/*!**************************************!*\
  !*** ./src/data-explorer/block.json ***!
  \**************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"starter-block-theme/data-explorer","version":"1.0.0","title":"Explorador de Dados","category":"start-category","icon":"dashboard","attributes":{"title":{"type":"string","default":"Quais dados você gostaria de explorar?"},"contactText":{"type":"string","default":"Começar"},"contactUrl":{"type":"string","default":"#"},"items":{"type":"array","default":[{"id":1,"label":"Gestão de Risco","imageUrl":"","imageId":0,"svg":""},{"id":2,"label":"Vendas","imageUrl":"","imageId":0,"svg":""},{"id":3,"label":"Marketing","imageUrl":"","imageId":0,"svg":""},{"id":4,"label":"Wi-Fi","imageUrl":"","imageId":0,"svg":""},{"id":5,"label":"AI Data Core","imageUrl":"","imageId":0,"svg":""},{"id":6,"label":"AI Labs convencional","imageUrl":"","imageId":0,"svg":""}]}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","viewScript":"file:./view.js"}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			let notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn, priority] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			const getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter/value functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			if(Array.isArray(definition)) {
/******/ 				var i = 0;
/******/ 				while(i < definition.length) {
/******/ 					var key = definition[i++];
/******/ 					var binding = definition[i++];
/******/ 					if(!__webpack_require__.o(exports, key)) {
/******/ 						if(binding === 0) {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 						} else {
/******/ 							Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 						}
/******/ 					} else if(binding === 0) { i++; }
/******/ 				}
/******/ 			} else {
/******/ 				for(var key in definition) {
/******/ 					if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"data-explorer/index": 0,
/******/ 			"data-explorer/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkstarter_block_theme"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["data-explorer/style-index"], () => (__webpack_require__("./src/data-explorer/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map