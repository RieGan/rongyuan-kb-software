
import { Layout } from '../../../supportDev'
export const ledAKKOCommonLayout: Layout = {
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
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightBreath',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightNeon',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0
            },
            {
                type: 'LightSnake',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['z', 'return'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightWave',
                maxValue: 4,
                minValue: 0,
                maxSpeed: 4,
                minSpeed: 0,
                options: ['down', 'up'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightMusicFollow3',
                maxValue: 4,
                minValue: 0,
                options: ['upright', 'separate', 'intersect'],
                rgb: true,
                dazzle: true
            },
            {
                type: 'LightMusicFollow2',
                maxValue: 4,
                minValue: 0,
                options: ['upright', 'separate', 'intersect'],

                rgb: true,
                dazzle: true
            },
            {
                type: 'LightScreenColor',
            },
        ]
    },
    reportRate: [125, 250, 500, 1000]
}