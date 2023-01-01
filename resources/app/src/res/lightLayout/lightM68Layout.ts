import { Layout } from '../../supportDev'
export const lightM68Layout: Layout = {
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
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightBreath',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightNeon',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
            },
            {
                type: 'LightWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['right', 'left', 'down', 'up'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightRipple',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightRaindrop',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightSnake',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['z', 'return'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightPressAction',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightConverage',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightSineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightKaleidoscope',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['out', 'in'],
                rgb: true,
                dazzle: true
            },

            {
                type: 'LightLineWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
            },
            {
                type: 'LightLaser',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightCircleWave',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['anti-clockwise', 'clockwise'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightDazzing',
                maxValue: 6,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightUserPicture',
                maxValue: 6,
                minValue: 0,
            },
            {
                type: 'LightMusicFollow',
                options: ['upright', 'separate', 'intersect'],
                maxValue: 6,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightMusicFollow2',
                maxValue: 6,
                minValue: 0,
                rgb: true,
                dazzle: true
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}