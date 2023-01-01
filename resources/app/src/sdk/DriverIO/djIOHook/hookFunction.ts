import { equals } from "ramda"
import { res } from "../../../res"
import { MouseKey } from "../DeviceAPI/DeviceInterface"

export interface IOHookEvent {
  type: string
  code?: string
  keychar?: number
  keyCode?: number
  rawcode?: number
  button?: number
  clicks?: number
  x?: number
  y?: number
}

const maxDelt = 65535
let lastEvent: IOHookEvent
let lastTime: number = 0
export const getMacroEvents = (event: IOHookEvent): MacroEvent[] => {
  if (equals(lastEvent, event)) {
    return []
  }
  lastEvent = event
  // console.error("event:::", event);

  let delt = 0
  const nowTime = Math.floor(process.uptime() * 1000)

  if (lastTime === 0) {
    lastTime = nowTime
  } else {
    delt = nowTime - lastTime > maxDelt ? maxDelt : nowTime - lastTime
    lastTime = nowTime
  }

  const hookE: MacroEvent = hookEventToMacroEvent(event)
  // console.error('HHHHHHOOOOOLLLLLL', hookE);

  return delt !== 0 ? [{ type: 'delay', value: delt }, hookE] : [hookE]
}
export const cleanTime = () => lastTime = 0
const hookEventToMacroEvent = (event: IOHookEvent): MacroEvent => {
  const action =
    event.type.substr(event.type.length - 2, 2) === 'up' ? 'up' : 'down'


  // console.error("event:::", event);
  // console.error("keyCodekeyCode:::::", event.keyCode);
  let hid = res.映射.keyCodeMapHIDCode(event.keyCode)

  if (event.keyCode === 16 || event.keyCode === 17 || event.keyCode === 18) {
    //左右特殊按键shift ctrl alt
    if (event.code?.indexOf("Right") != -1) {
      console.error("右右右");
      switch (event.keyCode) {
        case 16:// shift
          hid = 229
          break;
        case 17:// ctrl
          hid = 228
          break;
        case 18:// alt
          hid = 230
          break;
      }
    }
  }

  //小键盘特殊按键 
  //13     33    34      35   36    37 38 39 40 45   46
  //enter  pgup  pgdown  end  home  ←  ↑  →  ↓  ins  del
  const numArr: number[] = [13, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46]
  if (numArr.findIndex((v) => v === event.keyCode) != -1) {
    if (event.code?.indexOf("Numpad") != -1) {
      switch (event.keyCode) {
        case 13:// enter 
          hid = 88
          break;
        // case 33:// pgup 
        //   hid = 0x4B
        //   break;
        // case 34:// pgdown
        //   hid = 0x4E
        //   break;
        // case 35:// end
        //   hid = 0x4D
        //   break;
        // case 36:// home
        //   hid = 0x4A
        //   break;
        case 37:// ←
          hid = 0x50
          break;
        case 38:// ↑
          hid = 0x52
          break;
        case 39:// →
          hid = 0x4F
          break;
        case 40:// ↓
          hid = 81
          break;
        // case 45:// ins
        //   hid = 81
        //   break;
        // case 46:// del
        //   hid = 81
        //   break;
      }
    }
  }
  // console.error('HHHHHHHIIIIIIIDDDDDD', hid);

  if (event.type.substr(0, 1) === 'k') {
    return {
      type: 'keyboard',
      action: action,
      value: hid === undefined ? 0 : hid,
    }
  }
  if (event.type.substr(0, 1) === 'm') {
    let button = 0;
    if (event.button === undefined) {
      button = 0
    } else {
      switch (event.button) {
        case 0:
          button = MouseKey.Left;
          break;
        case 1:
          button = MouseKey.Middle;
          break;
        case 2:
          button = MouseKey.Right;
          break;
        case 3:
          button = MouseKey.Back;
          break;
        case 4:
          button = MouseKey.Forward;
          break;
      }
    }
    return {
      type: 'mouse_button',
      action: action,
      value: button,
    }
  }
  return { type: 'delay', value: 0 } //never
}