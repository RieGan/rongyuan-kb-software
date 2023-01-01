import React from 'react'
import { useObserver } from "mobx-react-lite";
import { dj } from "../../../../dj";
import { useStore } from "../../../../mobxStore/store";
import { SleepProp, wheelSleepData, withProps } from "../../../utils/WithProps";
import { getKeyPath } from "../../keyPath";
import { res } from '../../../../res';
import { OutsideAlerter } from '../../../utils/OutsideAlerter';
import { blockCloud } from '../../../../appConfig';

const KeyboardSleepUI = (p: SleepProp) => {

    // const keyPath = getKeyPath();

    const { deviceStore, isKeyStore } = useStore()
    // deviceStore.getSleepTime()

    const setSleepTime = (time: number, str: 'time_bt' | 'time_24' | 'deepTime_bt' | 'deepTime_24') => {
        const tmp: SleepKeyTime = {
            time_bt: p.sleepTime.time_bt,
            time_24: p.sleepTime.time_24,
            deepTime_bt: p.sleepTime.deepTime_bt,
            deepTime_24: p.sleepTime.deepTime_24
        }
        tmp[str] = time
        p.setSleepTime(tmp)
    }

    const arr_24 = new Array()
    const arr_deep24 = new Array()

    const arr_bt = new Array()
    const arr_deepBt = new Array()
    if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_24) {
        const tmp = deviceStore.currentDev.deviceType.otherSetting.sleep_24
        for (let i = 0; i <= (tmp.max - tmp.min); i++) {
            arr_24.push((i + tmp.min) + res.text.分钟())
        }

        for (let i = 0; i <= (tmp.max_deep - tmp.min_deep); i++) {
            arr_deep24.push((i + tmp.min_deep) + res.text.分钟())
        }
    }

    if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt) {
        const tmp = deviceStore.currentDev.deviceType.otherSetting.sleep_bt
        for (let i = 0; i <= (tmp.max - tmp.min); i++) {
            arr_bt.push((i + tmp.min) + res.text.分钟())
        }

        for (let i = 0; i <= (tmp.max_deep - tmp.min_deep); i++) {
            arr_deepBt.push((i + tmp.min_deep) + res.text.分钟())
        }
    }
    return useObserver(() => {
        return (
            <dj.View h={350}>
                <dj.FlexView
                    flexDirection={'row'}
                    w={330}
                    y={30}
                >
                    {deviceStore.currentDev?.deviceType.otherSetting?.sleep_24 && <dj.View relative w={330} h={100} x={15} y={4}>
                        <dj.View w={334} h={28}>
                            <dj.Text
                                w={'auto'}
                                x={0}
                                y={3}
                                type={'SubTitle_akko'}
                                text={res.string.关闭背光24}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_24}
                            />

                            <dj.MyComboBoxMui
                                className='notoutside'
                                w={110}
                                h={40}
                                x={blockCloud ? 155 : 120}
                                y={-4}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_24}
                                selectedValue={
                                    !deviceStore.currentDev?.deviceType.otherSetting?.sleep_24
                                        ? undefined
                                        : Math.floor(p.sleepTime.time_24 / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_24.min < 0
                                            ? arr_24[0]
                                            : Math.floor(p.sleepTime.time_24 / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_24.min > arr_24.length - 1
                                                ? arr_24[arr_24.length - 1]
                                                : arr_24[Math.floor(p.sleepTime.time_24 / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_24.min]
                                }
                                clickHandle={() => {
                                    isKeyStore.setIsShow24GCloseSelect(!isKeyStore.isShow24GCloseSelect);
                                    isKeyStore.setIsShow24GSleepSelect(false);
                                    isKeyStore.setIsShowBluetoothCloseSelect(false);
                                    isKeyStore.setIsShowBluetoothSleepSelect(false);
                                }}

                            />
                        </dj.View>


                        <dj.View w={334} h={28} y={60}>
                            <dj.Text
                                w={'auto'}
                                x={0}
                                type={'SubTitle_akko'}
                                text={res.string.睡眠24}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_24}
                            />

                            <dj.MyComboBoxMui
                                className='notoutside'
                                w={110}
                                h={40}
                                x={blockCloud ? 155 : 120}
                                y={-4}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_24}
                                selectedValue={
                                    !deviceStore.currentDev?.deviceType.otherSetting?.sleep_24
                                        ? undefined
                                        : Math.floor(p.sleepTime.deepTime_24 / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_24.min_deep < 0
                                            ? arr_deep24[0]
                                            : Math.floor(p.sleepTime.deepTime_24 / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_24.min_deep > arr_deep24.length - 1
                                                ? arr_deep24[arr_deep24.length - 1]
                                                : arr_deep24[Math.floor(p.sleepTime.deepTime_24 / 60) - deviceStore.currentDev.deviceType.otherSetting?.sleep_24.min_deep]
                                }
                                clickHandle={() => {
                                    isKeyStore.setIsShow24GSleepSelect(!isKeyStore.isShow24GSleepSelect);
                                    isKeyStore.setIsShow24GCloseSelect(false);
                                    isKeyStore.setIsShowBluetoothCloseSelect(false);
                                    isKeyStore.setIsShowBluetoothSleepSelect(false);
                                }}
                            />
                        </dj.View>
                    </dj.View>}

                    {deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt && <dj.View w={334} h={100} x={15} y={deviceStore.currentDev?.deviceType.otherSetting?.sleep_24 ? 125 : 4}>
                        <dj.View w={334} h={28}>
                            <dj.Text
                                w={'auto'}
                                x={0}
                                type={'SubTitle_akko'}
                                text={res.string.蓝牙关闭背光}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt}
                            />

                            <dj.MyComboBoxMui
                                className='notoutside'
                                w={110}
                                h={40}
                                x={blockCloud ? 155 : 120}
                                y={-4}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt}
                                selectedValue={
                                    !deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt
                                        ? undefined
                                        : Math.floor(p.sleepTime.time_bt / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min < 0
                                            ? arr_bt[0]
                                            : Math.floor(p.sleepTime.time_bt / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min > arr_bt.length - 1
                                                ? arr_bt[arr_bt.length - 1]
                                                : arr_bt[Math.floor(p.sleepTime.time_bt / 60) - deviceStore.currentDev.deviceType.otherSetting?.sleep_bt.min]
                                }
                                clickHandle={() => {
                                    isKeyStore.setIsShowBluetoothCloseSelect(!isKeyStore.isShowBluetoothCloseSelect);
                                    isKeyStore.setIsShow24GSleepSelect(false);
                                    isKeyStore.setIsShow24GCloseSelect(false);
                                    isKeyStore.setIsShowBluetoothSleepSelect(false);
                                }}
                            />
                        </dj.View>

                        <dj.View w={334} h={28} y={60}>
                            <dj.Text
                                w={'auto'}
                                x={0}
                                type={'SubTitle_akko'}
                                text={res.string.蓝牙睡眠}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt}
                            />

                            <dj.MyComboBoxMui
                                className='notoutside'
                                w={110}
                                h={40}
                                x={blockCloud ? 155 : 120}
                                y={-4}
                                isDisabled={!deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt}
                                selectedValue={
                                    !deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt
                                        ? undefined
                                        : Math.floor(p.sleepTime.deepTime_bt / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min_deep < 0
                                            ? arr_deepBt[0]
                                            : Math.floor(p.sleepTime.deepTime_bt / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min_deep > arr_deepBt.length - 1
                                                ? arr_deepBt[arr_deepBt.length - 1]
                                                : arr_deepBt[Math.floor(p.sleepTime.deepTime_bt / 60) - deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min_deep]
                                }
                                clickHandle={() => {
                                    isKeyStore.setIsShowBluetoothSleepSelect(!isKeyStore.isShowBluetoothSleepSelect);
                                    isKeyStore.setIsShow24GSleepSelect(false);
                                    isKeyStore.setIsShowBluetoothCloseSelect(false);
                                    isKeyStore.setIsShow24GCloseSelect(false);
                                }}

                            />
                        </dj.View>

                    </dj.View>}
                </dj.FlexView>

                {/* ---------- 2.4G关闭背光选择 --------- */}
                {
                    isKeyStore.isShow24GCloseSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShow24GCloseSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={110}
                            h={300}
                            x={blockCloud ? 170 : 135}
                            y={70}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={arr_24}
                            onChange={async (index: number) => {
                                if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_24) {
                                    setSleepTime((index + deviceStore.currentDev.deviceType.otherSetting.sleep_24.min) * 60, 'time_24')
                                }
                                isKeyStore.setIsShow24GCloseSelect(false)

                            }}
                        // overflow={'hidden scroll'}
                        />
                    </OutsideAlerter>
                }

                {/* ---------- 2.4G睡眠选择 --------- */}
                {
                    isKeyStore.isShow24GSleepSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShow24GSleepSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={110}
                            h={300}
                            x={blockCloud ? 170 : 135}
                            y={130}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={arr_deep24}
                            onChange={async (index: number) => {
                                if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_24) {
                                    setSleepTime((index + deviceStore.currentDev.deviceType.otherSetting.sleep_24.min_deep) * 60, 'deepTime_24')
                                }
                                isKeyStore.setIsShow24GSleepSelect(false);
                            }}
                        />
                    </OutsideAlerter>
                }

                {/* ---------- 蓝牙关闭背光选择 --------- */}
                {
                    isKeyStore.isShowBluetoothCloseSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShowBluetoothCloseSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={110}
                            h={300}
                            x={blockCloud ? 170 : 135}
                            y={191}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={arr_bt}
                            onChange={async (index: number) => {
                                if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt) {
                                    setSleepTime((index + deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min) * 60, 'time_bt')
                                }
                                isKeyStore.setIsShowBluetoothCloseSelect(false);
                            }}
                        />
                    </OutsideAlerter>
                }

                {/* ---------- 蓝牙睡眠选择 --------- */}
                {
                    isKeyStore.isShowBluetoothSleepSelect &&
                    <OutsideAlerter
                        clickOutsideHandle={() => {
                            isKeyStore.setIsShowBluetoothSleepSelect(false)
                        }}
                    >
                        <dj.ComboBoxSelect
                            w={110}
                            h={232}
                            x={blockCloud ? 170 : 135}
                            y={251}
                            zIndex={999}
                            overflow={'hidden scroll'}
                            modes={arr_deepBt}
                            onChange={async (index: number) => {
                                if (deviceStore.currentDev?.deviceType.otherSetting?.sleep_bt) {
                                    setSleepTime((index + deviceStore.currentDev.deviceType.otherSetting.sleep_bt.min_deep) * 60, 'deepTime_bt')
                                }
                                isKeyStore.setIsShowBluetoothSleepSelect(false);
                            }}
                        />
                    </OutsideAlerter>
                }

                {/* 键盘图 */}
                {/* <dj.Img
                    w={871}
                    h={288}
                    x={180}
                    imgBg={keyPath}
                /> */}
            </dj.View>
        )
    })

}

export const KeyboardSleep = withProps(KeyboardSleepUI, wheelSleepData)
