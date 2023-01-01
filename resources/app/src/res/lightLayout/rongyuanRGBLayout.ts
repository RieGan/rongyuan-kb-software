import { Layout } from '../../supportDev'
export const rongyuanRGBLayout: Layout = {
    light: {
        isRgb: true,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 6,
                minValue: 0,
                rgb: true
            },
            {
                type: 'LightBreath',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightWave',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left'],
            },
            {
                type: 'LightRipple',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
                options: ['full', 'single'],
            },
            {
                type: 'LightRaindrop',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightSnake',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['z', 'return'],
                rgb: true
            },
            {
                type: 'LightPressAction',
                maxSpeed: 5,
                minSpeed: 0,
                //options: ['onToOff', 'offToOn'],
                rgb: true
            },
            {
                type: 'LightConverage',
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightNeon',
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightUserPicture'
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}
export const MusicLightConfig = {

    type: 'LightMusicFollow',
    maxValue: 6,
    minValue: 0,
    options: ['upright', 'separate', 'intersect'],
    rgb: false


}
export const rongyuanRGBLayoutKB: Layout = {
    light: {
        isRgb: true,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 6,
                minValue: 0,

            },
            {
                type: 'LightBreath',
                maxSpeed: 5,
                minSpeed: 0,

            },
            {
                type: 'LightWave',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left'],
            },
            {
                type: 'LightRipple',
                maxSpeed: 5,
                minSpeed: 0,

                options: ['full', 'single'],
            },
            {
                type: 'LightRaindrop',
                maxSpeed: 5,
                minSpeed: 0,

            },
            {
                type: 'LightSnake',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['z', 'return'],

            },
            {
                type: 'LightPressAction',
                maxSpeed: 5,
                minSpeed: 0,
                //options: ['onToOff', 'offToOn'],

            },
            {
                type: 'LightNeon',
                maxSpeed: 5,
                minSpeed: 0,
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}
export const rongyuanRGBLayout2: Layout = {
    light: {
        isRgb: true,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 4,
                minValue: 0,
                rgb: true
            },
            {
                type: 'LightBreath',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightRipple',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
            },
            {
                type: 'LightRaindrop',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightSnake',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightPressAction',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                //options: ['onToOff', 'offToOn'],
                rgb: true
            },
            {
                type: 'LightConverage',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightNeon',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightSingleRipple',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightSineWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}

export const rongyuanNoRGBLayout = {
    light: {
        isRgb: false,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 6,
                minValue: 0,
                rgb: true
            },
            {
                type: 'LightBreath',
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightWave',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left']
            },
            {
                type: 'LightRipple',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['full', 'single']
            },
            {
                type: 'LightRaindrop',
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightSnake',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['z', 'return']
            },
            {
                type: 'LightPressAction',
                maxSpeed: 5,
                minSpeed: 0,
                options: ['onToOff', 'offToOn']
            },
            {
                type: 'LightConverage',
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightUserPicture'
            }
        ]
    },
    reportRate: [125, 250, 500, 1000]
}
export const rongyuanNoRGBLayout2 = {
    light: {
        isRgb: false,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 6,
                minValue: 0,
                rgb: true
            },
            {
                type: 'LightBreath',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left']
            },
            {
                type: 'LightRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                options: ['full', 'single']
            },
            {
                type: 'LightRaindrop',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightSnake',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                options: ['z', 'return']
            },
            {
                type: 'LightPressAction',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                options: ['onToOff', 'offToOn']
            },
            {
                type: 'LightConverage',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightUserPicture',
                maxValue: 6,
                minValue: 0,
            },
            {
                type: 'LightSingleRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0
            },
            {
                type: 'LightRoundRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}


export const rongyuanRGBLayout4: Layout = {
    light: {
        isRgb: true,
        types: [
            {
                type: 'LightOff',
            },
            {
                type: 'LightAlwaysOn',
                maxValue: 6,
                minValue: 0,
                rgb: true
            },
            {
                type: 'LightBreath',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightNeon',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
            },
            {
                type: 'LightWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                options: ['right', 'left'],
            },
            {
                type: 'LightRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true,
            },
            {
                type: 'LightRaindrop',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightSnake',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightPressAction',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },
            {
                type: 'LightConverage',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 5,
                minSpeed: 0,
                rgb: true
            },

        ]
    },
    reportRate: [125, 250, 500, 1000]
}