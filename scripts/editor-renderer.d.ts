
/**
 * @author zhangxin
 * @description creator编辑器头文件
 * 2020/9/4
 */



/**@class Gizmo (for the renderer Process)*/
declare module Editor {
     class Gizmo {

        /**
         * Register a moveable svg element. When the svg element is moved, the callback created from onCreateMoveCallbacks will be called.
         * @param svg  Svg Element - The svg element which can move.
         * @param args  Object | Array - The args will parse to callback:Funtion, you can check which svg element is moved with the args.
         * @param opts: {
         *                  cursor String - The move mouse cursor.
         *                  ignoreWhenHoverOther Boolean - Will ignore the mouse down event on this svg element if hover on other svg element.
         *              } 
         */
        registerMoveSvg(svg: SvgElement, args: Object | Array, opts?: { cursor?: string, ignoreWhenHoverOther?: boolean })

        /**
         * Record undo changes, generally gizmo will record changes automatically.
         */
        recordChanges()

        /**
         * Commit undo changes, generally gizmo will commit changes automatically
         */
        commitChanges()

        /**
         * Adjust value to avoid value's fractional part to be too long.
         * @param targets [Object] - The target wich should adjust.
         * @param keys  String (optional) - If not specified, then will adjust all available properties on target.
         * @param minDifference  Number(optionnal) - The decimal precision, default is Editor.Gizmo.prototype.defaultMinDifference()
         */
        adjustValue(targets: Object[], keys?: string | string[], minDifference?: number)

        /**
         * Convert cocos2d world position to svg position.
         * @param position 
         */
        worldToPixel(position: cc.Vec3): cc.Vec3
        worldToPixel(position: cc.Vec2): cc.Vec2

        /**
         * Convert svg position to cocos2d world position.
         * @param position 
         */
        pixelToWorld(position: cc.Vec3): cc.Vec3

        /**
         * Convert cocos2d scene position to svg position.
         * @param position 
         */
        sceneToPixel(position): cc.Vec3

        /**
         * Convert svg position to cocos2d scene position.
         * @param position 
         */
        pixelToScene(position): cc.Vec3

        /**
         * Call when init a gizmo, you can reimplement this function to do your self init. 
         */
        init()

        /**
         * There three layer types now: background, scene, foreground, generally we add gizmo to scene layer.
         *  Default implement:
         *  layer () {
         *       return 'scene';
         *  }
         */
        layer(): 'background' | 'scene' | 'foreground'

        /**
         * Whether the gizmo is visible, 
         * if you want the gizmo always be visible, then return true.
         * Default implement:
         *  visible () {
         *      return this.selecting || this.editing;
         *  }
         */
        visible(): boolean

        /**
         * Whether the gizmo is dirty, the gizmo will only update when gizmo is dirty. 
         * If you want to update gizmo every frame then return true.
         * 
         * Default implement:
         *  dirty(){
         *      return this._viewDirty() || this._nodeDirty() || this._dirty;
         *  }
         */
        dirty(): boolean

        /**
         * This function will call when create the root svg element for a gizmo. 
         * You can implement this function to custom your gizmo creation.
         */
        onCreateRoot()

        /**
         * This callback return from the function will call when the moveable svg element is moved.
         * The callback should include methods with:
         * start(x, y, event, ...args) -Called when mouse press on the svg  
         * update(dx, dy, event, ...args) - Called when mouse move on the svg
         * end(updated, event, ...args) - Called when mouse release on the svg
         */
        onCreateMoveCallbacks(): {
           /**
            *  Called when mouse press on the svg
            * @param x Number - Press x position
            * @param y Number - Press y position
            * @param event MouseEvent - The mouse event
            * @param args - The arguments parsed from registerMoveSvg
            */
            start: (x: number, y: number, event: MouseEvent, ...args) => void,
            /** 
             * Called when mouse move on the svg
             * @param dx Number - Horizontal move distance from current mouse position to start mouse position
             * @param dy Number - Vertical move distance from current mouse position to start mouse position
             * @param event MouseEvent - The mouse event
             * @param args - The arguments parsed from registerMoveSvg
            */
            update: (dx: number, dy: number, event: MouseEvent, ...args) => void,
            /**
             * Called when mouse release on the svg
             
             * @param event MouseEvent - The mouse event
             * @param args - The arguments parsed from registerMoveSvg
             */
            end: ( event: MouseEvent, ...args) => void
        }

        /**
         * Used for Editor.Gizmo.prototype.adjustValue.
         * The default min difference will be:
         * @default defaultMinDifference() {
         *      return Editor.Math.numOfDecimalsF(1.0/this._view.scale);
         *  }
         */
        defaultMinDifference()

        /**Get node of the gizmo.*/
        node: cc.Node

        /**Get current nodes of the gizmo.*/
        nodes: cc.Node[]

        /**Get current top nodes of the gizmo.*/
        topNodes: cc.Node

        /**Whether the gizmo is selecting.*/
        selecting: boolean

        /**Whether the gizmo is editing.*/
        editing: boolean

        /**Whether the gizmo is hovering.*/
        hovering: boolean

        /** 获取 gizmo 依附的组件*/
        target: CustomComponent

        _root:MySvg.Svg
    
        _view:{offsetHeight:number,scale:number,pixelToWorld(VEC2:cc.Vec2):cc.Vec2}
    }
}

/**@class GizmosUtils (for the renderer Process)*/
declare module Editor {
     class GizmosUtils {
        /**
         * 
         * @param position Vec2 - the vec2 to snap
         */
        static snapPixelWihVec2(position: cc.Vec2): cc.Vec2
        /**
         * 
         * @param pixel Number - the pixel to snap
         */
        static snapPixel(pixel: number): number
        /**
         * 
         * @param nodes  [Node] - the nodes to get center
         */
        static getCenter(nodes:cc.Node[])
    }
}
/**@module Editor (for the renderer Process) */
declare class Editor {
    /**
     * Returns the file path (if it is registered in custom protocol) or url (if it is a known public protocol).
     * @param url string
     */
    static url(url)

    /**
     * Load profile via url, if no profile found, it will use the defaultProfile and save it to the disk.You must register your profile path:string via Editor.Profile.register before you can use it.
     * @param url string - The url of the profile.
     * @param defaultProfile object - The default profile to use if the profile is not found.
     * @example:
     * register a project profile
     * Editor.Profile.register( 'project', '/foo/bar');
     * load the profile at /foo/bar/foobar.json
     * let profile = Editor.loadProfile( 'profile:/**project/foobar.json', {
     * foo: 'foo',
     * bar: 'bar',
     * });
     * change and save your profile
     * profile.foo = 'hello foo';
     * profile.save();
     */


    static loadProfile(url, defaultProfile)

    /**
     * urls string|array - The url list.
     */
    static import(urls)

}
/**@module Console (for the renderer Process) */
declare module Editor{
    declare module Console{
        /**
         * Trace the log.
         * @param level String - The log level 
         * @param ...args ... - Whatever arguments the message needs 
         */
         function trace(level, ...args?)
        
        
        
        /**
         * Log the normal message and show on the console. The method will send ipc message editor:renderer-console-log to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
         function log(...args?)
        
        /**
         * Log the success message and show on the console. The method will send ipc message editor:renderer-console-success to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
         function success(...args?)
        
        
        /**
         * Log the failed message and show on the console. The method will send ipc message editor:renderer-console-failed to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
         function failed(...args?)
      
        
        /**
         * Log the info message and show on the console. The method will send ipc message editor:renderer-console-info to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
         function info(...args?)
       
        
        /**
         * Log the warn message and show on the console. The method will send ipc message editor:renderer-console-warn to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
         function warn(...args?)
     
        
        /**
         * Log the error message and show on the console. The method will send ipc message editor:renderer-console-error to the main process.
         * @param ...args ... - Whatever arguments the message needs 
         */
         function error(...args?)
        
        

    }
}
/**@module Audio (for the renderer Process) */
declare module Editor {
    //TODO:这官方居然点不开这个 https://docs.cocos.com/creator/manual/zh/extension/api/editor-framework/renderer/audio.md
}
declare interface DialogOption{
    title:string//- 对话框窗口的标题
defaultPath:string// (可选) - 默认情况下使用的绝对目录路径、绝对文件路径或文件名。
buttonLabel:string// (可选) - 「确认」按钮的自定义标签, 当为空时, 将使用默认标签。
filters:FileFilter[]// (可选)
message:string //(optional) macOS - Message to display above text fields.
nameFieldLabel:string// (optional) macOS - Custom label for the text displayed in front of the filename text field.
showsTagField:boolean// (optional) macOS - Show the tags input box, defaults to true.
properties:Partial<['showHiddenFiles','createDirectory','treatPackageAsDirectory','dontAddToRecent','showOverwriteConfirmation']>// (optional)
//showHiddenFiles-显示对话框中的隐藏文件。
//createDirectory macOS - Allow creating new directories from dialog.
//treatPackageAsDirectory macOS - Treat packages, such as .app folders, as a directory instead of a file.
//showOverwriteConfirmation Linux - Sets whether the user will be presented a confirmation dialog if the user types a file name that already exists.
//dontAddToRecent Windows - Do not add the item being saved to the recent documents list.
securityScopedBookmarks:boolean// (optional) macOS mas - Create a security scoped bookmark when packaged for the Mac 
}
declare module Editor{
    declare module Dialog{
        /**Send 'dialog:open-file' to the main process */
         function openFile(...args)
        
        /**Send 'dialog:save-file' to the main process */
         function saveFile(options:Partial<DialogOption>)
        /**Send 'dialog:message-box' to the main process */
         function messageBox(...args)
        
    }
}
/**@module Ipc (for the renderer Process)*/
declare module Editor{
    declare module Ipc
    {
        /**
         * Cancel request sent to main or renderer process.
         * @param sessionID string - Session ID.
         */
         function cancelRequest (sessionID)



        /**
         * Ipc option used in  function sendToAll.
         * @param opts opts object
            excludeSelf boolean - exclude send ipc message to main process when calling  function sendToAll.

         */
         function option (opts)


        /**
         * 
        Send message with ...args to all opened window and to main process asynchronously.

         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param option object - You can indicate the last argument as an IPC option by  function option({...}).
         */
         function sendToAll (message, ...args?, option?)



        /**
         * Send message with ...args to main process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param callback function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
         * @param timeout number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
         */
         function sendToMain (message, ...args, callback?, timeout?)

        /**
         * Send message with ...args to main process synchronized and return a result which is responded from main process.

         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         */
         function sendToMainSync (message, ...args)



        /**
         * Send message with ...args to the main window asynchronously.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         */
         function sendToMainWin (message, ...args)





        /**
         * Send message with ...args to main process by package name and the short name of the message.
         * @param pkgName string - Package name.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         */
         function sendToPackage (pkgName, message, ...args)


        /**
         * Send message with ...args to panel defined in renderer process asynchronously. It is possible to add a callback as the last or the 2nd last argument to receive replies from the IPC receiver.
         * @param panelID string - Panel ID.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param callback function - You can specify a callback function to receive IPC reply at the last or the 2nd last argument.
         * @param timeout number - You can specify a timeout for the callback at the last argument. If no timeout specified, it will be 5000ms.
         */
         function sendToPanel (panelID, message, ...args?, callback?, timeout?)

        /**
         * Send message with ...args to all opened windows asynchronously. The renderer process can handle it by listening to the message through the Electron.ipcRenderer module.
         * @param message string - Ipc message.
         * @param ...args ... - Whatever arguments the message needs.
         * @param option object - You can indicate the last argument as an IPC option by Editor.Ipc.option({...}). 
         */
         function sendToWins (message, ...args, option)





    }
}
/**@module MainMenu (for the renderer Process) */
declare module Editor{
    /**The main menu module for manipulating main menu items. */
    declare module MainMenu{
        /**Apply main menu changes. */
         function apply ()


        /**
         * Send main-menu:add to main process.
         * @param path string - Menu path
         * @param template array|object - Menu template
         */
         function add (path, template)




        /**Send main-menu:init to main process. */
         function init ()


        /**
         * Send main-menu:remove to main process.
         * @param path string - Menu path
         */
         function remove (path)



        /**
         * Send main-menu:set to main process.
         * @param path string - Menu path
         * @param options :{
         * 
            icon NativeImage - A NativeImage
            enabled boolean
            visible boolean
            checked boolean - NOTE: You must set your menu-item type to 'checkbox' to make it work
            }
         */
         function set (path, options)


        /**
         * Send main-menu:update to main process.
         * @param path string - Menu path
         * @param template array|object - Menu template
         */
         function update (path, template)




    }
}
/**@class Menu (for the renderer Process)*/
declare module Editor{
    declare class Menu
    {
        /**
         * Send menu:popup to main process.
         * @param template array|object - Menu template for initialize. The template take the options of Electron's Menu Item
         * @param x The position x
         * @param y The position y
         */
        static popup (template:Partial<MenuTemplate>, x, y)
          /**
         * Send menu:register to main process.
         * @param name Name of the register menu
         * @param fn  A function returns the menu template
         * @param force  Force to register a menu even it was registered before
         */
        static register(name: string, fn: Function, force: boolean)
       
        /**
         * @example Editor.Menu.walk(menuTmpl, item => {
            if ( item.params ) {
                item.params.unshift('Hello');
            }

            if (item.message === 'foobar:say-hello') {
                item.enabled = false;
            }
            });
         * @param template Menu template for initialize. The template take the options of Electron's Menu Item
         * @param fn Function applied to each menu item
         */
        static walk(template: Partial<MenuTemplate>, fn: Function)
    }
}
/**@module Package (for the renderer Process)*/
declare module Editor{
    declare module Package{
        /**
         * Send editor:package-reload to main process.
         * @param name string - The package name
         */
         function reload (name)
        
        
        /**
         * Send editor:package-query-info to main process.
         * @param name string - The package name
         * @param cb function
         */
         function queryInfo (name, cb)
        
        
        
        /**
         * Send editor:package-query-infos to main process.
         * @param cb function
         */
         function queryInfos (cb)
        
        
    }
}
window.Vue=Vue
/**@module Panel (for the renderer Process) */    
declare module Editor{
    declare module Panel{
        /**
         * Close a panel via panelID.
         * @param panelID string - The panel ID
         */
         function close (panelID)



        /**
         * Cache a panel frame and send editor:panel-dock to main
         * @param panelID string - The panel ID
         * @param frameEL HTMLElement - The panel frame
         */
         function dock (panelID, frameEL)



        /** Dump the layout of the panels in current window.*/
         function dumpLayout ()


        /**
         * Create a simple panel frame via panelID.
         * @param panelID string - The panel ID
         * @param cb function
         */
         function newFrame (panelID, cb)


        interface panel{
            $emit(event:string,...args:any)
        }

        /**
         * Extends a panel.
         * @param proto object
         */
         function extend (proto)


        /**
         * Find panel frame via panelID.
         * @param panelID string - The panel ID
         */
         function find (panelID)

        /**
         * Focus panel via panelID.
         * @param panelID string - The panel ID
         */
         function focus (panelID)



        /**Get current focused panel. */
         function getFocusedPanel ()


        /**
         * Get panel info via panelID.
         * @param panelID string - The panel ID
         */
         function getPanelInfo (panelID)


        /**
         * Check if the specific panel is dirty.
         * @param panelID string - The panel ID
         */
         function isDirty (panelID)


        /**
         * Open a panel via panelID.
         * @param panelID string - The panel ID
         * @param argv object
         */
         function open (panelID, argv?)

        /**
         * Popup an exists panel via panelID.
         * @param panelID string - The panel ID
         */
         function popup (panelID)


        /**
         * Remove a panel element from document but do not close it.

         * @param panelID string - The panel ID
         */
         function undock (panelID)

        /**Get panels docked in current window. */
         var panels


        //  IPC Messages

        Message: 'editor:panel-run'

        Message: 'editor:panel-unload'

        Message: 'editor:panel-out-of-date'
    }
}
/**@module Protocol (for the renderer Process) Protocol module used in Editor.url and custom protocol.*/
declare module Editor{
    declare module Protocol{
        /**
         * @example 
         *  const Path = require('path');

            let _url2path = base => {
                return uri => {
                    if ( uri.pathname ) {
                        return Path.join( base, uri.host, uri.pathname );
                    }
                    return Path.join( base, uri.host );
                };
            };

            Editor.Protocol.register('editor-framework', _url2path(Editor.frameworkPath));
         * @description Register a protocol so that Editor.url can use it to convert an url to the filesystem path. The fn accept an url Object via url.parse.
         * @param protocol string - Protocol name
         * @param fn function
         */
         function register (protocol, fn)






    }
}
/**@module Window (for the renderer Process) */
declare module Editor{
    declare module Window{
        /**
         * Open a new Editor.Window with options and load url.
         * @param name string
         * @param url string
         * @param options object
         */
         function open (name, url, options)
        
        /**Focus on current window. */
         function focus ()
        
        /**
         * Load url in current window.
         * @param url string
         * @param argv object
         */
         function load (url, argv)
        
        /**
         * Resize current window.
         * @param w number
         * @param h number
         * @param useContentSize useContentSize boolean
         */
         function resize (w, h, useContentSize)
        
        
        /**
         * Resize current window synchronously.
         * @param w number
         * @param h number
         * @param useContentSize boolean
         */
         function resizeSync (w, h, useContentSize)
        
        /**Center the window. */
         function center ()
        
        
        //IPC Messages
        /**Turn on the inspect element mode. */
        Message: 'editor:window-inspect'
        
        
    }
}



/**@module  UI (for the renderer Process)(DOM Utils Module) */
declare module Editor{
    declare module UI{

        /**
         * Load url content and create a style element to wrap it.
         * @param url string 
         */
         function createStyleElement (url)
        
        
        
        /**
         * Remove all child element.
         * @param element HTMLElement 
         */
         function clear (element)
        
        
        
        /**
         * Get the index of the element
         * @param element HTMLElement
         */
         function index (element)
        
        
        
        /**
         * Get the parent element, it will go through the host if it is a shadow element.
         * @param element HTMLElement
         */
         function parentElement (element)
        
        
        
        /**
         * Returns the offset {x, y} from el to parentEL
         * @param el HTMLElement 
         * @param parentEL HTMLElement
         */
         function offsetTo (el, parentEL)
        
        
        
        
        /**
         * Recursively search children use depth first algorithm.
         * @param el HTMLElement
         * @typedef opts
         * @param opts @type {
         diveToShadow:boolean,
         excludeSelf:boolean
         }
         * 
         * @param cb function
         */
         function walk (el, opts, cb)
        
        
        
        
        
        /**
         * Fires a CustomEvent to the specific element .
         * @param element HTMLElement
         * @param eventName string
         * @param opts object
         * @example   
        Editor.fire(el, 'foobar', {
            bubbles: false,
            detail: {
                value: 'Hello World!'
            }
        });
         */
         function fire (element, eventName, opts)
        
        /**
         * Call preventDefault and stopImmediatePropagation for the event
        
         * @param event Event
         */
         function acceptEvent (event)
        
        
        /**
         * Handle mouse down and up event for button like element
         * @param element HTMLElement 
         */
         function installDownUpEvent (element)
        
        
        
        /**
         * Check if the element is in document
        
         * @param el el HTMLElement
         */
         function inDocument (el)
        
        
        /**
         * Check if the element is in panel
         * @param el HTMLElement
         */
         function inPanel (el)
        
        
        
        /**
         * Check if the element is visible by itself
         * @param el HTMLElement
         */
         function isVisible (el)
        
        
        
        /**
         * Check if the element is visible in hierarchy
         * @param el HTMLElement
         */
         function isVisibleInHierarchy (el)
        
        
        
        /**
         * Start handling element dragging behavior
         * @param cursor string - CSS cursor
         * @param event Event
         * @param onMove function
         * @param onEnd function
         * @param onWheel function
         */
         function startDrag (cursor, event, onMove, onEnd, onWheel)
        
        /**Cancel dragging element */
         function cancelDrag ()
        
        
        /**
         * Add a dragging mask to keep the cursor not changed while dragging
         * @param cursor string - CSS cursor
         */
         function addDragGhost (cursor)
        
        
        
        /**
         * Remove the dragging mask
         */
         function removeDragGhost ()
        
        
        /**
         *  Add hit mask
         * @param cursor string - CSS cursor
         * @param zindex number
         * @param onhit function
         */
         function addHitGhost (cursor, zindex, onhit)
        
        
        
        
       
        /**Remove hit mask */
         function removeHitGhost ()
        
        
        /**
         * Add loading mask
         * @param options object
         * @param onclick function
         */
         function addLoadingMask (options, onclick)
        
        
        
        
        /**
         * Remove loading mask
         */
         function removeLoadingMask ()
        
        
        /**
         * Convert a string to human friendly text. For example, fooBar will be Foo bar
         * @param text string
         */
         function toHumanText (text)
        
        
        
        /**
         * Convert a string to camel case text. For example, foo-bar will be fooBar
         * @param text string
         */
         function camelCase (text)
        
        
        
        /**
         * Convert a string to kebab case text. For example, fooBar will be foo-bar
         * @param text string
         */
         function kebabCase (text)
        
        
        
    }
}
/**@module UI (for the renderer Process)(Element Utils Module)*/
declare module Editor{
    declare module UI{
        /**
         * Get registered property via type.
         * @param type string
         */
         function getProperty (type)
        
        
        /**
         * Parse txt as an array.
         * @param txt string
         */
         function parseArray (txt)
        
        
        /**
         * Parse txt as a boolean value.
         * @param txt string
         */
         function parseBoolean (txt)
        
        
        /**
         * Parse txt as a color object.
         * @param txt string
         */
         function parseColor (txt)
        
        
        /**
         * Parse txt as an object.
         * @param txt string
         */
         function parseObject (txt)
        
        
        /**
         * Parse txt as a string.
         * @param txt string
         */
         function parseString (txt)
        
        
        /**
         * Regenerate property at propEL.
         * @param propEL HTMLElement
         * @param cb function
         */
         function regenProperty (propEL, cb)
        
        
        
        /**
         * Register a custom element.
         * @param name string
         * @param def object
         */
         function registerElement (name, def)
        
        
        
        /**
         * Register a custom property.
         * @param type string
         * @param protoOrUrl object|string
         */
         function registerProperty (type, protoOrUrl)
        
        
        
        /**
         * Unregister a custom property.
         * @param type string
         */
         function unregisterProperty (type)
        
        
    }
}
/**@module UI (for the renderer Process)(Focus Module) */
declare module Editor{
    declare module UI{
        /**
         * Focus on specific element.
         * @param element HTMLElement
         */
         function focus (element)
        
        /**
         * Focus on the parent of element.
         * @param element HTMLElement
         */
         function focusParent (element)
        
        
        /**Focus on the next element. */
         function focusNext ()
        
        /**Focus on the previous element. */
         function focusPrev ()
        
        
        //Properties
        /**Current focused element. */
         let focusedElement
        
        /**Current focused panel frame. */
         let focusedPanelFrame
        
        /**The last focused element. */
         let lastFocusedElement
        
        /**The last focused panel frame. */
         let lastFocusedPanelFrame
        
        
    }
}
/**@module UI (for the renderer Process)(Resources Module) */
declare module Editor{
    declare module UI{
        /**
         * Get cached resource by url.
         * @param url string
         */
         function getResource (url)
        
        
        /**
         * Load and cache the resource then return a promise.
         * @param url string
         */
         function importResource (url)
        
        
        /**
         * Load and evaluate the script, cache the result then return a promise.
         * @param url string
         */
         function importScript (url)
        
        
        /**
         * Load and evaluate the script list, cache the result then return a promise.
         * @param urls array
         */
         function importScripts (urls)
        
        
        /**
         * Load and cache the style sheet by url then return a promise.
         * @param url string
         */
         function importStylesheet (url)
        
        
        /**
         * Load and cache the style sheet by urls list then return a promise.
         * @param urls array
         */
         function importStylesheets (urls)
        
        
        /**
         * Load and cache the template then return a promise.
         * @param url string
         */
         function importTemplate (url)
        
        
        /**
         * @description Load and append script by url. Once it is done, the cb will be invoked.
         * @see NOTE: the different between loadGlobalScript and importScript is loadGlobalScript use <script> tag, and it will process zipped script internally in browser. However, loadGlobalScript cannot return evaluated result, which means you can only get the context in it by assigning global variable inside the target script.
         * @param url string
         * @param cb function
         */
         function loadGlobalScript (url, cb)
        
        
        
        
        

        
    }
}
/**@module UI.Settings (for the renderer Process)(Resources Module) */
declare module Editor{
    declare module Editor.UI.Settings{
        /**Control the default step for float point input element. Default is 0.1. */
         let stepFloat
        
        /**Control the default step for integer input element. Default is 1. */
         let stepInt
        
        /**Control the step when shift key press down. Default is 10. */
         let shiftStep
        
    }
}
/**@module DockUtils (for the renderer Process)TODO: The API still under development.*/
declare module Editor{
    declare module DockUtils
    {
        
        /**The root element for docking in the window. */
        root

        
        /** The size of the resizer.*/
        resizerSpace

        
    }
}
/**@module DragDrop (for the renderer Process)TODO: The API still under development.*/
declare module Editor{
    declare module UI.DragDrop{

    }
}


// Type definitions for @svgdotjs version 3.x
// Project: @svgdotjs/svg.js

// trick to keep reference to Array build-in type
declare class BuiltInArray<T> extends Array<T> { }

// trick to have nice attribute list for CSS
declare type CSSStyleName = Exclude<keyof CSSStyleDeclaration, "parentRule" | "length" >

declare module MySvg {

    function SVG(): Svg;
    function SVG(selector: QuerySelector): Element;
    function SVG<T>(el: T): SVGTypeMapping<T>
    function SVG(domElement: HTMLElement): Element;

    function eid(name: string): string;
    function get(id: string): Element;

    function create(name: string): any;
    function extend(parent: object, obj: object): void;
    function invent(config: object): any;
    function adopt(node: HTMLElement): Element;
    function prepare(element: HTMLElement): void;
    function getClass(name: string): Element;

    function on(el: Node | Window, events: string, cb: EventListener, binbind?: any, options?: AddEventListenerOptions): void;
    function on(el: Node | Window, events: Event[], cb: EventListener, binbind?: any, options?: AddEventListenerOptions): void;

    function off(el: Node | Window, events?: string, cb?: EventListener | number): void;
    function off(el: Node | Window, events?: Event[], cb?: EventListener | number): void;

    function dispatch(node: Node | Window, event: Event, data?: object, options?: object): Event

    function find(query: QuerySelector): List<Element>
    function findOne(query: QuerySelector): Element

    function getWindow(): Window;
    function registerWindow(win: Window, doc: Document): void;
    function restoreWindow(): void;
    function saveWindow(): void;
    function withWindow(win: Window, fn: (win: Window, doc: Document) => void): void;

    let utils: {
        map(array: any[], block: Function): any;
        filter(array: any[], block: Function): any;
        radians(d: number): number;
        degrees(r: number): number;
        camelCase(s: string): string;
        unCamelCase(s: string): string;
        capitalize(s: string): string;
        // proportionalSize
        // getOrigin
    }

    let defaults: {
        attrs: {
            'fill-opacity': number;
            'stroke-opacity': number;
            'stroke-width': number;
            'stroke-linejoin': string;
            'stroke-linecap': string;
            'fill': string;
            'stroke': string;
            'opacity': number;
            'x': number;
            'y': number;
            'cx': number;
            'cy': number;
            'width': number;
            'height': number;
            'r': number;
            'rx': number;
            'ry': number;
            'offset': number;
            'stop-opacity': number;
            'stop-color': string;
            'font-size': number;
            'font-family': string;
            'text-anchor': string;
        },
        timeline: {
            duration: number;
            ease: string;
            delay: number;
        }

    }

    // let easing: {
    //     '-'(pos: number): number;
    //     '<>'(pos: number): number;
    //     '>'(pos: number): number;
    //     '<'(pos: number): number;
    //     bezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number;
    //     steps(steps: number, stepPosition?: "jump-start"|"jump-end"|"jump-none"|"jump-both"|"start"|"end"): (t: number, beforeFlag?: boolean) => number;
    // }

    let regex: {
        delimiter: RegExp;
        dots: RegExp;
        hex: RegExp;
        hyphen: RegExp;
        isBlank: RegExp;
        isHex: RegExp;
        isImage: RegExp;
        isNumber: RegExp;
        isPathLetter: RegExp;
        isRgb: RegExp;
        numberAndUnit: RegExp;
        numbersWithDots: RegExp;
        pathLetters: RegExp;
        reference: RegExp;
        rgb: RegExp;
        transforms: RegExp;
        whitespace: RegExp;
    }

    let namespaces: {
        ns: string;
        xmlns: string;
        xlink: string;
        svgjs: string;
    }

    interface LinkedHTMLElement extends HTMLElement {
        instance: Element;
    }

    // ************ Standard object/option/properties declaration ************

    type AttrNumberValue = number | "auto";

    /**
     * The SVG core attributes are all the common attributes that can be specified on any SVG element.
     * More information see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Core
     */
    interface CoreAttr {
        id?: string
        lang?: string
        tabindex?: number
        "xml:lang"?: string
    }

    /**
     * The SVG styling attributes are all the attributes that can be specified on any SVG element to apply CSS styling effects.
     * More information see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Styling
     */
    interface StylingAttr {
        /**
         * a valid HTML class name
         */
        class?: string
        /**
         * SVG css style string format. It all can be find here https://www.w3.org/TR/SVG/styling.html#StyleAttribute
         */
        style?: string
    }

    /**
     * A global attribute that can be use with any svg element
     */
    interface GlobalAttr extends CoreAttr, StylingAttr { }

    // TODO: implement SVG Presentation Attributes. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/Presentation

    interface PathBaseAttr {
        pathLength?: number
    }

    interface RadiusAxisAttr {
        rx?: AttrNumberValue
        ry?: AttrNumberValue
    }

    /**
     * SVG Rectangle attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/rect
     */
    interface RectAttr extends RadiusAxisAttr, PathBaseAttr, GlobalAttr {
        x?: number
        y?: number
        width: AttrNumberValue
        height: AttrNumberValue
    }

    /**
     * SVG Line attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/line
     */
    interface LineAttr extends PathBaseAttr, GlobalAttr {
        x1?: number
        y1?: number
        x2?: number
        y2?: number
    }

    /**
     * SVG Circle attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/circle
     */
    interface CircleAttr extends PathBaseAttr, GlobalAttr {
        cx?: number | string
        cy?: number | string
        r?: number | string
    }

    /**
     * SVG Ellipse attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/ellipse
     */
    interface EllipseAttr extends PathBaseAttr, GlobalAttr {
        cx?: number | string
        cy?: number | string
        rx?: number | string
        ry?: number | string
    }

    /**
     * SVG Path attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/path
     */
    interface PathAttr extends PathBaseAttr, GlobalAttr {
        d?: string
    }

    /**
     * SVG Path attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polygon
     * or https://developer.mozilla.org/en-US/docs/Web/SVG/Element/polyline
     */
    interface PolyAttr extends PathBaseAttr, GlobalAttr {
        points?: string
    }

    /**
     * SVG Text attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text
     */
    interface TextAttr extends GlobalAttr {
        x?: number | string
        y?: number | string
        dx?: number | string
        dy?: number | string
        lengthAdjust?: "spacing" | "spacingAndGlyphs"
        textLength?: number | string
        // see https://developer.mozilla.org/en-US/docs/Web/API/SVGNumberList
        // or https://developer.mozilla.org/en-US/docs/Web/SVG/Content_type#List-of-Ts
        // TODO: tbd
        // rotate?: string
    }

    /**
     * SVG TextPath attribute, more information see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
     */
    interface TextPathAttr extends GlobalAttr {
        href?: string
        lengthAdjust?: "spacing" | "spacingAndGlyphs"
        method?: "align" | "stretch"
        side?: "left" | "right"
        spacing?: "auto" | "exact"
        startOffset?: number | string
        textLength?: number | string
        // See https://developer.mozilla.org/en-US/docs/Web/SVG/Element/textPath
        // TODO: tbd as there is no reference to see the detail of how it would look like
        // path?: string
    }

    /**
     * A generic Dom Box object.
     * Notice: DOMRect is still in experiment state and document is not complete (Draft)
     * See https://developer.mozilla.org/en-US/docs/Web/API/DOMRect
     */
    interface DOMRect {
        x?: number
        y?: number
        width?: number
        height?: number
        top?: number
        right?: number
        bottom?: number
        left?: number
    }

    // ************ SVG.JS generic Conditional Types declaration ************

    type SVGTypeMapping<T> =
        T extends HTMLElement ? Dom :
        T extends SVGSVGElement ? Svg :
        T extends SVGRectElement ? Rect :
        T extends SVGCircleElement ? Circle :
        T extends SVGPathElement ? Path :
        T extends SVGTextElement ? Text :
        T extends SVGTextPathElement ? TextPath :
        T extends SVGGElement ? G :
        T extends SVGLineElement ? Line :
        T extends SVGPolylineElement ? Polyline :
        T extends SVGPolygonElement ? Polygon :
        T extends SVGGradientElement ? Gradient :
        T extends SVGImageElement ? Image :
        T extends SVGEllipseElement ? Ellipse :
        T extends SVGMaskElement ? Mask :
        T extends SVGMarkerElement ? Marker :
        T extends SVGClipPathElement ? ClipPath :
        T extends SVGTSpanElement ? Tspan :
        T extends SVGSymbolElement ? Symbol :
        T extends SVGUseElement ? Use : Element

    // element type as string
    type SvgType = "svg"
    type ClipPathType = "clipPath"
    type TextType = "text"
    type GType = "g"
    type AType = "a"

    type ParentElement = SvgType | GType | AType

    type AttrTypeMapping<T> =
        T extends Rect ? RectAttr : GlobalAttr

    type ElementAlias = Dom | Svg | Rect | Line | Polygon | Polyline | Ellipse | ClipPath | Use |
        Text | Path | TextPath | Circle | G | Gradient | Image | Element

    type ElementTypeAlias = typeof Dom | typeof Svg | typeof Rect | typeof Line | typeof Polygon |
        typeof Polyline | typeof Ellipse | typeof ClipPath | typeof Use | typeof Text | typeof Path |
        typeof TextPath | typeof Circle | typeof G | typeof Gradient | typeof Image | typeof Element

    type AttributeReference = "href" | "marker-start" | "marker-mid" | "marker-end" | "mask" |
        "clip-path" | "filter" | "fill"

    // ************* SVG.JS Type Declaration *************
    // ********** Locate in directory src/types **********

    // SVGArray.js
    // Notice: below class is defined the name as `Array` rather than `SVGArray`.
    // The purpose of giving the name as `Array` is to allow it to be aligned with SVG.JS  type
    // as SVG.JS  it as `Array` (to be precise `SVG.Array`) so reading through JS documentation
    // should be more straightforward.
    /**
     * Type alias to native array.
     *
     * **Caution**: If argument is a string, generic type must be a number or array of number and
     * the string is format as a concatenate of number separate by comma.
     * This is expensive to build runtime type check for such as case so please use it carefully.
     */
    type ArrayAlias<T> = BuiltInArray<T> | T[] | string

    class Array<T> extends BuiltInArray<T> {
        constructor(array?: ArrayAlias<T>);

        /**
         * Return array of generic T however it's flatten array by 1 level as it using `apply` function.
         * For example: if T is a `number[]` which is the number of 2 dimension `Array<number[]>` the result will be `number[]`
         */
        toArray(): any[]
        /**
         * return a concatenated string of each element separated by space
         */
        toString(): string
        valueOf(): T[]
        clone(): Array<T>
        toSet(): Set<T>
        parse(a?: ArrayAlias<T>): T[]
        to(a: any): Morphable;
    }

    // point.js
    class Point {
        x: number;
        y: number;
        constructor();
        constructor(position: CoordinateXY);
        constructor(point: Point);
        constructor(x: number, y?: number);
        clone(): Point;
        transform(matrix: Matrix): this;
        transformO(matrix: Matrix): this;
        toArray(): ArrayXY;
    }

    // pointArray.js
    class PointArray extends Array<ArrayXY> {
        constructor();
        constructor(array?: ArrayAlias<ArrayXY> | number[]);

        toLine(): LineAttr;
        at(pos: number): PointArray;
        transform(m: Matrix | MatrixLike): PointArray
        move(x: number, y: number): this;
        size(width: number, height: number): this;
        bbox(): Box;
        to(a: any): Morphable;
        toString(): string;
    }

    // SVGNumber.js
    type NumberUnit = [number, string]

    class Number {
        constructor();
        constructor(value: Number);
        constructor(value: string);
        constructor(value: number, unit?: any);
        constructor(n: NumberUnit);

        value: number
        unit: any

        toString(): string;
        toJSON(): object;  // same as toString
        toArray(): NumberUnit
        valueOf(): number;
        plus(number: NumberAlias): Number;
        minus(number: NumberAlias): Number;
        times(number: NumberAlias): Number;
        divide(number: NumberAlias): Number;
        convert(unit: string): Number;
        to(a: any): Morphable
    }

    type NumberAlias = Number | number | string;

    // PathArray.js

    type LineCommand = ['M' | 'm' | 'L' | 'l', number, number] | ['H' | 'h' | 'V' | 'v', number] | ['Z' | 'z']

    type CurveCommand =
        // Bezier Curves
        ['C' | 'c', number, number, number, number, number, number] |
        ['S' | 's' | 'Q' | 'q', number, number, number, number] | ['T' | 't', number, number] |
        // Arcs
        ['A' | 'a', number, number, number, number, number, number, number]

    type PathCommand = LineCommand | CurveCommand

    type PathArrayAlias = PathArray | PathCommand[] | (string | number)[] | string;

    class PathArray extends Array<PathCommand> {
        constructor();
        constructor(d: ArrayAlias<PathCommand> | PathArrayAlias);

        move(x: number, y: number): this;
        size(width: number, height: number): this;
        equalCommands(other: PathArray): boolean
        morph(pa: PathArray): this
        at(pos: number): PathArray
        parse(array?: ArrayAlias<PathCommand> | PathArrayAlias): PathCommand[];
        bbox(): Box;
        to(a: any): Morphable
    }

    // Matrix.js
    interface TransformData {
        origin?: number[];
        scaleX?: number;
        scaleY?: number;
        shear?: number;
        rotate?: number;
        translateX?: number;
        translateY?: number;
        originX?: number;
        originY?: number;
    }

    interface MatrixLike {
        a?: number;
        b?: number;
        c?: number;
        d?: number;
        e?: number;
        f?: number;
    }

    interface MatrixExtract extends TransformData, MatrixLike { }

    type FlipType = 'both' | 'x' | 'y' | boolean
    type ArrayXY = [number, number]
    type CoordinateXY = ArrayXY | { x: number, y: number }

    interface MatrixTransformParam {
        flip?: FlipType
        skew?: ArrayXY | number
        skewX?: number
        skewY?: number
        scale?: ArrayXY | number
        scaleX?: number
        scaleY?: number
        shear?: number
        theta?: number
        origin?: CoordinateXY
        around?: CoordinateXY
        ox?: number
        originX?: number
        oy?: number
        originY?: number
        position?: CoordinateXY
        px?: number
        positionX?: number
        py?: number
        positionY?: number
        translate?: CoordinateXY
        tx?: number
        translateX?: number
        ty?: number
        translateY?: number
        relative?: CoordinateXY
        rx?: number
        relativeX?: number
        ry?: number
        relativeY?: number
    }

    type MatrixAlias = MatrixLike | TransformData | MatrixTransformParam | number[] | Element | string;

    class Matrix implements MatrixLike {
        constructor();
        constructor(source: MatrixAlias);
        constructor(a: number, b: number, c: number, d: number, e: number, f: number);

        a: number;
        b: number;
        c: number;
        d: number;
        e: number;
        f: number;

        // *** To Be use by Test Only in restrict mode ***
        [key: string]: any

        clone(): Matrix;
        transform(o: MatrixLike | MatrixTransformParam): Matrix
        compose(o: MatrixExtract): Matrix
        decompose(cx?: number, cy?: number): MatrixExtract
        multiply(m: MatrixAlias | Matrix): Matrix;
        multiplyO(m: MatrixAlias | Matrix): this;
        lmultiply(m: MatrixAlias | Matrix): Matrix;
        lmultiplyO(m: MatrixAlias | Matrix): this;
        inverse(): Matrix;
        inverseO(): this;
        translate(x?: number, y?: number): Matrix;
        translateO(x?: number, y?: number): this;
        scale(x: number, y?: number, cx?: number, cy?: number): Matrix;
        scaleO(x: number, y?: number, cx?: number, cy?: number): this;
        rotate(r: number, cx?: number, cy?: number): Matrix;
        rotateO(r: number, cx?: number, cy?: number): this;
        flip(a: NumberAlias, offset?: number): Matrix;
        flipO(a: NumberAlias, offset?: number): this;
        flip(offset?: number): Matrix;
        shear(a: number, cx?: number, cy?: number): Matrix;
        shearO(a: number, cx?: number, cy?: number): this;
        skew(y?: number, cx?: number, cy?: number): Matrix;
        skewO(y?: number, cx?: number, cy?: number): this;
        skew(x: number, y?: number, cx?: number, cy?: number): Matrix;
        skewX(x: number, cx?: number, cy?: number): Matrix;
        skewY(y: number, cx?: number, cy?: number): Matrix;
        around(cx?: number, cy?: number, matrix?: Matrix): Matrix;
        aroundO(cx?: number, cy?: number, matrix?: Matrix): this;
        equals(m: Matrix): boolean
        toString(): string;
        toArray(): number[];
        valueOf(): MatrixLike;
        to(a: any): Morphable;
    }

    type ListEachCallback<T> = (el: T, index: number, list: List<T>) => any;

    // List.js
    class List<T> extends BuiltInArray<T> {
        each(fn: ListEachCallback<T>): List<any>;
        each(name: string, ...args: any[]): List<any>;
        toArray(): T[];
    }

    class Eventobject {
        [key: string]: Eventobject;
    }

    // EventTarget.js
    class EventTarget {
        events: Eventobject

        addEventListener(): void
        dispatch(event: Event | string, data?: object): Event
        dispatchEvent(event: Event): boolean
        fire(event: Event | string, data?: object): this
        getEventHolder(): this | Node
        getEventTarget(): this | Node

        on(events: string | Event[], cb: EventListener, binbind?: any, options?: AddEventListenerOptions): this;
        off(events?: string | Event[], cb?: EventListener | number): this;

        removeEventListener(): void
    }

    // Color.js
    interface ColorLike {
        r: number;
        g: number;
        b: number;

        x: number;
        y: number;
        z: number;

        h: number;
        s: number;
        l: number;
        a: number;
        c: number;

        m: number;
        k: number;

        space: string;
    }

    type ColorAlias = string | ColorLike;

    class Color implements ColorLike {
        r: number;
        g: number;
        b: number;

        x: number;
        y: number;
        z: number;

        h: number;
        s: number;
        l: number;
        a: number;
        c: number;

        m: number;
        k: number;

        space: string;
        constructor()
        constructor(color: ColorAlias, space?: string);
        constructor(a: number, b: number, c: number, space?: string)
        constructor(a: number, b: number, c: number, d: number, space?: string)
        constructor(a: number[], space?: string)

        rgb(): Color
        lab(): Color
        xyz(): Color
        lch(): Color
        hsl(): Color
        cmyk(): Color
        toHex(): string
        toString(): string
        toRgb(): string
        toArray(): any[]

        to(a: any): Morphable
        fromArray(a: any): this

        static random(mode: 'sine', time?: number): Color
        static random(mode?: string): Color
    }

    // Box.js
    interface BoxLike {
        height: number;
        width: number;
        y: number;
        x: number;
        cx?: number;
        cy?: number;
        w?: number;
        h?: number;
        x2?: number;
        y2?: number;
    }

    class Box implements BoxLike {
        height: number;
        width: number;
        y: number;
        x: number;
        cx: number;
        cy: number;
        w: number;
        h: number;
        x2: number;
        y2: number;

        constructor();
        constructor(source: string);
        constructor(source: number[]);
        constructor(source: DOMRect);
        constructor(x: number, y: number, width: number, height: number);

        merge(box: BoxLike): Box;
        transform(m: Matrix): Box
        addOffset(): this;
        toString(): string;
        toArray(): number[];
        isNulled(): boolean;
        to(v: MorphValueLike): Morphable;
    }

    // Morphable.js
    type MorphValueLike = string | number | objectBag | NonMorphable | MatrixExtract | Array<any> | any[]

    class Morphable {
        constructor();
        constructor(st: Stepper);

        from(): MorphValueLike
        from(v: MorphValueLike): this
        to(): MorphValueLike
        to(v: MorphValueLike): this
        type(): any
        type(t: any): this
        stepper(): Stepper
        stepper(st: Stepper): this
        done(): boolean
        at(pos: number): any
    }

    class objectBag {
        constructor();
        constructor(a: object);
        valueOf(): object
        toArray(): object[]

        to(a: object): Morphable
        fromArray(a: any[]): this
    }

    class NonMorphable {
        constructor(a: object)
        valueOf(): object
        toArray(): object[]

        to(a: object): Morphable
        fromArray(a: object): this
    }

    class TransformBag {
        constructor()
        constructor(a: number[])
        constructor(a: TransformData)
        defaults: TransformData
        toArray(): number[]
        to(t: TransformData): Morphable
        fromArray(t: number[]): this
    }

    interface Stepper {
        done(c?: object): boolean
    }

    class Ease implements Stepper {
        constructor()
        constructor(fn: string)
        constructor(fn: Function)

        step(from: number, to: number, pos: number): number
        done(): boolean
    }

    class Controller implements Stepper {
        constructor(fn?: Function)
        step(current: number, target: number, dt: number, c: number): number
        done(c?: object): boolean
    }

    // Queue.js
    interface QueueParam {
        value: any
        next?: any
        prev?: any
    }

    class Queue {
        constructor();

        push(value: any): QueueParam
        shift(): any
        first(): number
        last(): number
        remove(item: QueueParam): void
    }

    // Timeline.js
    interface ScheduledRunnerInfo {
        start: number
        duration: number
        end: number
        runner: Runner
    }

    class Timeline extends EventTarget {
        constructor()
        constructor(fn: Function)

        schedule(runner: Runner, delay?: number, when?: string): this
        schedule(): ScheduledRunnerInfo[]
        unschedule(runner: Runner): this
        getEndTime(): number
        updateTime(): this
        persist(dtOrForever?: number | boolean): this
        play(): this
        pause(): this
        stop(): this
        finish(): this
        speed(speed: number): this
        reverse(yes: boolean): this
        seek(dt: number): this
        time(): number
        time(time: number): this
        source(): Function
        source(fn: Function): this
    }

    // Runner.js
    interface TimesParam {
        duration: number
        delay: number
        when: number | string
        swing: boolean
        wait: number
        times: number
    }

    type TimeLike = number | TimesParam | Stepper

    type EasingCallback = (...any) => number
    type EasingLiteral = "<>" | "-" | "<" | ">"

    class Runner {
        constructor();
        constructor(options: Function);
        constructor(options: number);
        constructor(options: Controller);

        static sanitise: (duration?: TimeLike, delay?: number, when?: string) => object

        element(): Element
        element(el: Element): this
        timeline(): Timeline
        timeline(timeline: Timeline): this
        animate(duration: TimeLike, delay?: number, when?: string): this
        schedule(delay: number, when?: string): this
        schedule(timeline: Timeline, delay?: number, when?: string): this
        unschedule(): this
        loop(times?: number, swing?: boolean, wait?: number): this
        loop(times: TimesParam): this
        delay(delay: number): this



        during(fn: Function): this
        queue(initFn: Function, runFn: Function, retargetFn?: boolean | Function, isTransform?: boolean): this
        after(fn: EventListener): this
        time(): number
        time(time: number): this
        duration(): number
        loops(): number
        loops(p: number): this
        persist(dtOrForever?: number | boolean): this
        position(): number
        position(p: number): this
        progress(): number
        progress(p: number): this
        step(deta?: number): this
        reset(): this
        finish(): this
        reverse(r?: boolean): this
        ease(fn: EasingCallback) : this
        ease(kind: EasingLiteral) : this
        active(): boolean
        active(a: boolean): this
        addTransform(m: Matrix): this
        clearTransform(): this
        clearTransformsFromQueue(): void

        // extends prototypes
        attr(a: string | object, v?: string): this
        css(s: string | object, v?: string): this
        styleAttr(type: string, name: string | object, val?: string): this
        zoom(level: NumberAlias, point?: Point): this
        transform(transforms: MatrixTransformParam, relative?: boolean, affine?: boolean): this
        x(x: number): this
        y(y: number): this
        dx(dx: number): this
        dy(dy: number): this
        cx(x: number): this
        cy(y: number): this
        move(x: number, y: number): this
        center(x: number, y: number): this
        size(width: number, height: number): this
        width(width: number): this
        height(height: number): this
        plot(a: object): this
        plot(a: number, b: number, c: number, d: number): this
        leading(value: number): this
        viewbox(x: number, y: number, width: number, height: number): this
        update(offset: number, color: number, opacity: number): this
        update(o: StopProperties): this
        rx(): number
        rx(rx: number): this
        ry(): number
        ry(ry: number): this
        from(x: NumberAlias, y: NumberAlias): this
        to(x: NumberAlias, y: NumberAlias): this
    }

    // Animator.js
    let Animator: {
        nextDraw: any
        frames: Queue
        timeouts: Queue
        immediates: Queue

        timer(): boolean
        frame(fn: Function): object
        timeout(fn: Function, delay?: number): object
        immediate(fn: Function): object
        cancelFrame(o: object): void
        clearTimeout(o: object): void
        cancelImmediate(o: object): void
    }

    /**
     * Just fancy type alias to refer to css query selector.
     */
    type QuerySelector = string

    class Dom extends EventTarget {
        node: HTMLElement | SVGElement;
        type: string;

        constructor(node?: HTMLElement, attr?: object);
        constructor(att: object);
        add(element: Element, i?: number): this;
        addTo(parent: Dom | HTMLElement | string): this
        children(): List<Element>;
        clear(): this;
        clone(): this;
        each(block: (index: number, children: Element[]) => void, deep?: boolean): this;
        element(element: string, inherit?: object): this;
        first(): Element;
        get(i: number): Element;
        getEventHolder(): LinkedHTMLElement;
        getEventTarget(): LinkedHTMLElement;
        has(element: Element): boolean;
        id(): string
        id(id: string): this
        index(element: Element): number;
        last(): Element;
        matches(selector: string): boolean;
        /**
         * Finds the closest ancestor which matches the string or is of passed type. If nothing is passed, the parent is returned
         * @param type can be either string, svg.js object or undefined.
         */
        parent(type?: ElementTypeAlias | QuerySelector): Dom | null;
        put(element: Element, i?: number): Element;
        /**
         * Put the element into the given parent element and returns the parent element
         * @param parent The parent in which the current element is inserted
         */
        putIn(parent: ElementAlias | Node | QuerySelector): Dom;

        remove(): this;
        removeElement(element: Element): this;
        replace<T extends Dom>(element: T): T;
        round(precision?: number, map?: string[]): this
        svg(): string;
        svg(a: string, outer: true): Element;
        svg(a: string, outer?: false): this;
        svg(a: boolean, outer?: boolean): string;
        svg(a: null | Function, outer?: boolean): string;

        toString(): string;
        words(text: string): this;
        writeDataToDom(): this;

        // prototype extend Attribute in attr.js
        /**
         * Get the attribute object of SVG Element. The return object will be vary based on
         * the instance itself. For example, G element will only return GlobalAttr where Rect
         * will return RectAttr instead.
         */
        attr(): any;
        /**
         * Add or update the attribute from the SVG Element. To remove the attribute from the element set value to null
         * @param name name of attribute
         * @param value value of attribute can be string or number or null
         * @param namespace optional string that define namespace
         */
        attr(name: string, value: any, namespace?: string): this;
        attr(name: string): any;
        attr(obj: object): this;
        attr(obj: string[]): object;

        // prototype extend Selector in selector.js
        find(query: string): List<Element>
        findOne(query: string): Dom

        // prototype method register in data.js
        data(a: string): object | string | number
        data(a: string, v: object, substain?: boolean): this
        data(a: object): this

        // prototype method register in arrange.js
        siblings(): List<Element>
        position(): number
        next(): Element
        prev(): Element
        forward(): this
        backward(): this
        front(): this
        back(): this
        before(el: Element): Element
        after(el: Element): Element
        insertBefore(el: Element): this
        insertAfter(el: Element): this

        // prototype method register in class.js
        classes(): string[]
        hasClass(name: string): boolean
        addClass(name: string): this
        removeClass(name: string): this
        toggleClass(name: string): this

        // prototype method register in css.js
        css(): Partial<CSSStyleDeclaration>
        css<T extends CSSStyleName>(style: T): CSSStyleDeclaration[T]
        css<T extends CSSStyleName[]>(style: T): Partial<CSSStyleDeclaration>
        css<T extends CSSStyleName>(style: T, val: CSSStyleDeclaration[T]): this
        css(style: Partial<CSSStyleDeclaration>): this
        show(): this
        hide(): this
        visible(): boolean

        // memory.js
        remember(name: string, value: any): this;
        remember(name: string): any;
        remember(obj: object): this;
        forget(...keys: string[]): this;
        forget(): this;
        memory(): object;

        addEventListener(): void
        dispatch(event: Event | string, data?: object): Event
        dispatchEvent(event: Event): boolean
        fire(event: Event | string, data?: object): this
        getEventHolder(): this | Node
        getEventTarget(): this | Node

        // on(events: string | Event[], cb: EventListener, binbind?: any, options?: AddEventListenerOptions): this;
        // off(events?: string | Event[], cb?: EventListener | number): this;
        removeEventListener(): void
    }

    // clip.js
    class ClipPath extends Container {
        constructor();
        constructor(node?: SVGClipPathElement);
        constructor(attr: object);
        node: SVGClipPathElement;

        targets(): List<Element>;
        remove(): this;
    }

    // container.js
    interface ViewBoxLike {
        x: number;
        y: number;
        width: number;
        height: number;
    }

    class Container extends Element {
        circle(size?: NumberAlias): Circle;
        circle(size: number, unit: number): Circle;
        clip(): ClipPath;
        ellipse(width?: number, height?: number): Ellipse;
        flatten(parent: Dom, depth?: number): this;
        foreignObject(width: number, height: number) : ForeignObject
        gradient(type: string, block?: (stop: Gradient) => void): Gradient;
        group(): G;

        image(): Image;
        image(href?: string, callback?: (e: Event) => void): Image;
        line(points?: PointArrayAlias): Line;
        line(x1: number, y1: number, x2: number, y2: number): Line;
        link(url: string): A;
        marker(width?: number, height?: number, block?: (marker: Marker) => void): Marker
        mask(): Mask;
        nested(): Svg;
        path(): Path;
        path(d: PathArrayAlias): Path;
        pattern(width?: number, height?: number, block?: (pattern: Pattern) => void): Pattern
        plain(text: string): Text;
        polygon(points?: PointArrayAlias): Polygon;
        polyline(points?: PointArrayAlias): Polyline;
        rect(width?: number, height?: number): Rect;
        text(block: (tspan: Tspan) => void): Text;
        text(text: string): Text;
        ungroup(parent: Dom, depth?: number): this;
        use(element: Element | string, file?: string): Use;
        viewbox(): Box;
        viewbox(viewbox: ViewBoxLike | string): this;
        viewbox(x: number, y: number, width: number, height: number): this;
        textPath(text: string | Text, path: string | Path): TextPath
        symbol(): Symbol
        zoom(level: NumberAlias, point?: Point)
    }

    class Defs extends Container {
        constructor(node?: SVGDefsElement);
        node: SVGDefsElement;
        marker(width?: number, height?: number, block?: (marker: Marker) => void): Marker
    }

    class Svg extends Container {
        constructor(svgElement?: SVGSVGElement);
        constructor(id: string);
        node: SVGSVGElement;
        namespace(): this;
        defs(): Defs;
        remove(): this;
        isRoot(): boolean;
    }

    interface Sugar {
        fill(): any
        fill(fill: FillData): this;
        fill(color: string): this;
        fill(pattern: Element): this;
        fill(image: Image): this;
        stroke(): any;
        stroke(stroke: StrokeData): this;
        stroke(color: string): this;
        matrix(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number): this;
        matrix(mat: MatrixAlias, b?: number, c?: number, d?: number, e?: number, f?: number): this;
        rotate(degrees: number, cx?: number, cy?: number): this;
        skew(skewX?: number, skewY?: number, cx?: number, cy?: number): this;
        scale(scaleX?: number, scaleY?: number, cx?: number, cy?: number): this;
        translate(x: number, y: number): this;
        shear(lam: Matrix, cx: number, cy: number): this
        relative(x: number, y: number): this
        flip(direction?: string, around?: number): this
        flip(around: number): this
        opacity(): number
        opacity(value: number): this
        font(a: string): string
        font(a: string, v: string | number): this
        font(a: object): this
    }

    // Symbol.js
    class Symbol extends Container {
        constructor(svgElement?: SVGSymbolElement);
        constructor(attr: object)
        node: SVGSymbolElement;
    }
     type cursorTypes=

        /*需使用的自定义光标的 URL。
        注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。*/
        'url'|
        /**默认光标（通常是一个箭头） */
        'default'|	
        /**默认。浏览器设置的光标。 */
        'auto'	|
        /**光标呈现为十字线。 */
        'crosshair'|
        /**光标呈现为指示链接的指针（一只手） */
        'pointer'|	
        /**此光标指示某对象可被移动。 */
        'move'	|
        /**此光标指示矩形框的边缘可被向右（东）移动。 */
        'e-resize'	|
        /**此光标指示矩形框的边缘可被向上及向右移动（北/东）。 */
        'ne-resize'	|
        /**此光标指示矩形框的边缘可被向上及向左移动（北/西）。 */
        'nw-resize'|	
        /**此光标指示矩形框的边缘可被向上（北）移动。 */
        'n-resize'|
        /**此光标指示矩形框的边缘可被向下及向右移动（南/东） */	
        'se-resize'|	
        /**此光标指示矩形框的边缘可被向下及向左移动（南/西）。*/
        'sw-resize'|	
        /**此光标指示矩形框的边缘可被向下移动（南）。 */
        's-resize'|	
        /**此光标指示矩形框的边缘可被向左移动（西）。 */
        'w-resize'|	
        /**	此光标指示文本。 */
        'text'|
        /**此光标指示程序正忙（通常是一只表或沙漏）。 */
        'wait'|	
        /**	此光标指示可用的帮助（通常是一个问号或一个气球）。 */
        'help'
    
     type pointEvents=
        /* Keyword values */
        'auto'|
        'none'|
        'visiblePainted'| /* SVG only */
        'visibleFill'|    /* SVG only */
        'visibleStroke'|  /* SVG only */
        'visible'|        /* SVG only */
        'painted'|        /* SVG only */
        'fill'|           /* SVG only */
        'stroke'|         /* SVG only */
        'all'|            /* SVG only */
        
        /* Global values */
        'inherit'|
        'initial'|
        'unset'
    
    class Element extends Dom implements Sugar {
        constructor(node?: SVGElement);
        constructor(attr: object);
        node: SVGElement;
        type: string;
        dom: any
        style(attribute:'cursor',value:  cursorTypes):this
        style(attribute:'pointer-events',value:  pointEvents):this
        style(attribute:string,value:string):this
        addClass(name: string): this;
        after(element: Element): Element;
        animate(duration?: TimeLike, delay?: number, when?: string): Runner;
        delay(by: number, when?: string): Runner
        attr(): any;
        attr(name: string, value: any, namespace?: string): this;
        attr(name: string): any;
        attr(obj: string[]): object;
        attr(obj: object): this;
        back(): this;
        backward(): this;
        bbox(): Box;
        before(element: Element): Element;
        center(x: number, y: number): this;
        classes(): string[];
        click(cb: Function | null): this;
        clipper(): ClipPath;
        clipWith(element: Element): this;
        clone(): this;
        ctm(): Matrix;
        cx(): number;
        cx(x: number): this;
        cy(): number;
        cy(y: number): this;
        data(name: string, value: any, sustain?: boolean): this;
        data(name: string): any;
        data(val: object): this;
        dblclick(cb: Function | null): this;
        defs(): Defs;
        dmove(x: NumberAlias, y: NumberAlias): this;
        dx(x: NumberAlias): this;
        dy(y: NumberAlias): this;
        event(): Event | CustomEvent;
        fill(): any;
        fill(color: string): this;
        fill(color: Color | ColorLike): this;
        fill(color: FillData): this;
        fill(pattern: Element): this;
        fire(event: Event): this;
        fire(event: string, data?: any): this;
        flip(a: string, offset?: number): this;
        flip(offset?: number): this;
        font(a: object): this
        font(a: string, v: string | number): this
        font(a: string): string
        forget(...keys: string[]): this;
        forget(): this;
        forward(): this;
        front(): this;
        hasClass(name: string): boolean;
        height(): NumberAlias;
        height(height: NumberAlias): this;
        hide(): this;
        hide(): this;
        id(): string;
        id(id: string): this;
        inside(x: number, y: number): boolean;
        is(cls: any): boolean;
        linkTo(url: (link: A) => void): A;
        linkTo(url: string): A;
        masker(): Mask
        maskWith(element: Element): this;
        maskWith(mask: Mask): this;
        matches(selector: string): boolean;
        matrix(): Matrix;
        matrix(a?: number, b?: number, c?: number, d?: number, e?: number, f?: number): this;
        matrix(mat: MatrixAlias, b?: number, c?: number, d?: number, e?: number, f?: number): this;
        matrixify(): Matrix;
        memory(): object;
        mousedown(cb: Function | null): this;
        mousemove(cb: Function | null): this;
        mouseout(cb: Function | null): this;
        mouseover(cb: Function | null): this;
        mouseup(cb: Function | null): this;
        mouseenter(cb: Function | null): this;
        mouseleave(cb: Function | null): this;
        move(x: NumberAlias, y: NumberAlias): this;
        native(): LinkedHTMLElement;
        next(): Element;
        // off(events?: string | Event[], cb?: EventListener | number): this;
        // on(event: string, cb: Function, context?: object): this;
        opacity(): number;
        opacity(o: number): this;
        relative(x: number, y: number): this
        shear(lam: Matrix, cx: number, cy: number): this
        toRoot(): Svg;
        /**
         * By default parents will return a list of elements up until the root svg.
         */
        parents(): List<Element>
        /**
         * List the parent by hierarchy until the given parent type or matcher. If the given value is null
         * then the result is only provided the list up until Svg root element which mean no Dom parent element is included.
         * @param util a parent type
         */
        parents<T extends Dom>(util: QuerySelector | T | null ): List<Element>
        /**
         * Get reference svg element based on the given attribute.
         * @param attr a svg attribute
         */
        reference<R extends Dom>(attr: AttributeReference): R | null

        point(): Point;
        point(position: CoordinateXY): Point;
        point(point: Point): Point;
        point(x: number, y: number): Point;
        position(): number;
        prev(): Element;
        rbox(element?: Element): Box;
        reference(type: string): Element;
        remember(name: string, value: any): this;
        remember(name: string): any;
        remember(obj: object): this;
        remove(): this;
        removeClass(name: string): this;
        root(): Svg;
        rotate(d: number, cx?: number, cy?: number): this;
        scale(x?: number, y?: number, cx?: number, cy?: number): this;
        screenCTM(): Matrix;
        setData(data: object): this;
        show(): this;
        show(): this;
        size(width?: NumberAlias, height?: NumberAlias): this;
        skew(x?: number, y?: number, cx?: number, cy?: number): this;
        stop(jumpToEnd: boolean, clearQueue: boolean): Animation;
        stop(offset?: NumberAlias | string, color?: NumberAlias, opacity?: NumberAlias): Stop;
        stop(val: { offset?: NumberAlias | string, color?: NumberAlias, opacity?: NumberAlias }): Stop;
        stroke(): any;
        stroke(color: string): this;
        stroke(stroke: StrokeData): this;
        timeline(): Timeline
        timeline(tl: Timeline): this
        toggleClass(name: string): this;
        toParent(parent: Dom): this;
        toSvg(): this;
        touchcancel(cb: Function | null): this;
        touchend(cb: Function | null): this;
        touchleave(cb: Function | null): this;
        touchmove(cb: Function | null): this;
        touchstart(cb: Function | null): this;
        transform(): MatrixExtract;
        transform(t: MatrixAlias, relative?: boolean): this;
        translate(x: number, y: number): this;
        unclip(): this;
        unmask(): this;
        untransform(): this;
        visible(): boolean;
        width(): NumberAlias;
        width(width: NumberAlias): this;
        x(): NumberAlias;
        x(x: NumberAlias): this;
        y(): NumberAlias;
        y(y: NumberAlias): this;
    }

    // ellipse.js
    interface CircleMethods extends Shape {
        rx(rx: number): this;
        rx(): this;
        ry(ry: number): this;
        ry(): this;
        radius(x: number, y?: number): this;
    }
    class Circle extends Shape implements CircleMethods {
        constructor(node?: SVGCircleElement);
        constructor(attr: CircleAttr)

        node: SVGCircleElement;

        rx(rx: number): this;
        rx(): this;
        ry(ry: number): this;
        ry(): this;
        radius(x: number, y?: number): this;
    }
    class Ellipse extends Shape implements CircleMethods {
        node: SVGEllipseElement;
        constructor(attr: EllipseAttr)
        constructor(node?: SVGEllipseElement);

        rx(rx: number): this;
        rx(): this;
        ry(ry: number): this;
        ry(): this;
        radius(x: number, y?: number): this;
    }

    interface StopProperties {
        color?: ColorAlias;
        offset?: number | string;
        opacity?: number;
    }

    // gradient.js
    class Stop extends Element {
        update(offset?: number, color?: ColorAlias, opacity?: number): this;
        update(opts: StopProperties): this;
    }
    class Gradient extends Container {
        constructor(node?: SVGGradientElement);
        constructor(attr: object);
        constructor(type: string);
        node: SVGGradientElement;

        at(offset?: number, color?: ColorAlias, opacity?: number): Stop;
        at(opts: StopProperties): Stop;
        url(): string;
        toString(): string;
        targets(): List<Element>
        bbox(): Box

        // gradiented.js
        from(x: number, y: number): this;
        to(x: number, y: number): this;

        // TODO: check with main.js
        radius(x: number, y?: number): this;
        targets(): List<Element>
        bbox(): Box
        update(block?: (gradient: Gradient) => void): this;
    }

    // group.js
    class G extends Container {
        constructor(node?: SVGGElement);
        constructor(attr: object);
        node: SVGGElement;
        gbox(): Box;
        /**自定义函数 */
        plot:Function
    }

    // hyperlink.js
    class A extends Container {
        constructor(node?: SVGAElement);
        constructor(attr: object);
        node: SVGAElement;
        to(url: string): this;
        to(): string;
        target(target: string): this;
        target(): string;
    }


    // ForeignObject.js
    class ForeignObject extends Element {
        constructor(node?: SVGForeignObjectElement, attrs?: object);
        constructor(attrs?: object);
        add(element: Dom, i?: number): this;
    }

    // image.js
    class Image extends Shape {
        constructor(node?: SVGImageElement);
        constructor(attr: object);
        node: SVGImageElement;
        load(url?: string, callback?: (event: Event) => void): this;
    }

    // line.js
    type PointArrayAlias = number[] | ArrayXY[] | PointArray | string;

    class Line extends Shape {
        constructor(attr: LineAttr)
        constructor(node?: SVGLineElement);

        node: SVGLineElement;

        array(): PointArray;
        plot(): PointArray
        plot(points?: PointArrayAlias): this;
        plot(x1: number, y1: number, x2: number, y2: number): this;
        move(x: number, y: number): this;
        size(width?: number, height?: number): this;
        marker(position: string, width?: number, height?: number, block?: (marker: Marker) => void): Marker;
        marker(position: string, marker: Marker): Marker;
    }

    // marker.js
    // TODO: check register method marker
    class Marker extends Container {
        constructor();

        node: SVGMarkerElement;

        ref(x: string | number, y: string | number): this;
        update(block: (marker: Marker) => void): this;
        toString(): string;
        orient(orientation: 'auto' | 'auto-start-reverse' | number | Number): this;
        orient(): string;
    }
    // mask.js
    class Mask extends Container {
        constructor(node?: SVGMaskElement);
        constructor(attr: object);
        node: SVGMaskElement;
        remove(): this
        targets(): List<Element>;
    }

    // path.js
    class Path extends Shape {
        constructor(attr: PathAttr)
        constructor(node?: SVGPathElement);

        node: SVGPathElement;

        morphArray: PathArray;
        array(): PathArray;
        plot(): PathArray;
        plot(d: PathArrayAlias): this;
        marker(position: string, width?: number, height?: number, block?: (marker: Marker) => void): this;
        marker(position: string, marker: Marker): this;

        // sugar.js
        length(): number;
        pointAt(length: number): { x: number, y: number };
        text(text: string): TextPath
        text(text: Text): TextPath
        targets(): List<Element>

    }


    // pattern.js
    class Pattern extends Container {
        url(): string;
        url(...rest: any[]): never;
        update(block: (pattern: Pattern) => void): this;
        toString(): string;
    }

    // poly.js
    interface poly {
        array(): PointArray;
        plot(): PointArray
        plot(p: PointArrayAlias): this;
        clear(): this;
        move(x: number, y: number): this;
        size(width: number, height?: number): this;
    }

    // pointed.js
    interface pointed {
        x(): number
        x(x: number): this
        y(): number
        y(y: number): this
        height(): number
        height(h: number): this
        width(): number
        width(w: number): this
    }

    class Polyline extends Shape implements poly, pointed {
        constructor(node?: SVGPolylineElement);
        constructor(attr: PolyAttr);

        node: SVGPolylineElement;

        array(): PointArray;
        plot(): PointArray
        plot(p: PointArrayAlias): this;
        x(): number;
        x(x: number): this
        y(): number;
        y(y: number): this
        height(): number
        height(h: number): this
        width(): number
        width(w: number): this
        move(x: number, y: number): this;
        size(width: number, height?: number): this;
        marker(position: string, width?: number, height?: number, block?: (marker: Marker) => void): Marker;
        marker(position: string, marker: Marker): Marker;
    }

    class Polygon extends Shape implements poly, pointed {
        constructor(node?: SVGPolygonElement);
        constructor(attr: PolyAttr)

        node: SVGPolygonElement;
        array(): PointArray;
        plot(): PointArray;
        plot(p: PointArrayAlias): this;
        x(): number;
        x(x: number): this
        y(): number;
        y(y: number): this
        height(): number
        height(h: number): this
        width(): number
        width(w: number): this
        move(x: number, y: number): this;
        size(width: number, height?: number): this;
        marker(position: string, width?: number, height?: number, block?: (marker: Marker) => void): Marker;
        marker(position: string, marker: Marker): Marker;
    }

    class Rect extends Shape {
        constructor(node?: SVGRectElement);
        constructor(attr: RectAttr)
        node: SVGRectElement;
        radius(x: number, y?: number): this;
    }

    // shape.js
    class Shape extends Element {
    }

    // sugar.js
    interface StrokeData {
        color?: string;
        width?: number;
        opacity?: number;
        linecap?: string;
        linejoin?: string;
        miterlimit?: number;
        dasharray?: string;
        dashoffset?: number;
    }

    interface FillData {
        color?: string
        opacity?: number
        rule?: string
    }

    interface FontData {
        family?: string;
        size?: NumberAlias;
        anchor?: string;
        leading?: NumberAlias;
        weight?: string;
        style?: string
    }
    // textable.js
    interface Textable {
        plain(text: string): this;
        length(): number;
    }

    // text.js
    class Text extends Shape implements Textable {
        constructor(node?: SVGElement);
        constructor(attr: TextAttr)

        clone(): this;
        text(): string;
        text(text: string): this;
        text(block: (text: this) => void): this;
        leading(): Number;
        leading(leading: NumberAlias): this;
        rebuild(enabled: boolean): this;
        build(enabled: boolean): this;
        clear(): this;
        plain(text: string): this;
        length(): number;
        get(i: number): Tspan;
        path(): TextPath
        path(d: PathArrayAlias | Path): TextPath;
        track(): Element;
        ax(): string
        ax(x: string): this
        ay(): string
        ay(y: string): this
        amove(x: number, y: number): this
        textPath(): TextPath

        // main.js, from extend/copy prototypes from Tspan
        tspan(text: string): Tspan;
        tspan(block: (tspan: Tspan) => void): this;
    }

    class Tspan extends Text implements Textable {
        constructor(node?: SVGElement);
        constructor(attr: TextAttr);
        dx(): number;
        dx(x: NumberAlias): this;
        dy(): number;
        dy(y: NumberAlias): this;
        newLine(): this;
        tspan(text: string): Tspan;
        tspan(block: (tspan: Tspan) => void): this;
        length(): number;
        text(): string;
        text(text: string): this;
        text(block: (text: this) => void): this;
        plain(text: string): this;
    }

    // textpath.js
    class TextPath extends Text {
        constructor();
        constructor(attr: TextPathAttr)

        array(): Array<any>
        plot(): PathArray
        plot(d: string): this
        track(): Path
    }

    // use.js
    class Use extends Shape {
        use(element: string, file?: string): this;
    }

    // viewbox.js
    type ViewBoxAlias = ViewBoxLike | number[] | string | Element;

    interface ViewBox {
        x: number;
        y: number;
        width: number;
        height: number;
        toString(): string;
        at(pos: number): ViewBox;
    }
}
