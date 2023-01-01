import { Entity, PrimaryColumn, Column, BaseEntity } from 'typeorm'



@Entity()
export class SessionUser extends BaseEntity {

    constructor(session: string, userid: number) {
        super()
        this.id = 1
        this.session = session
        this.userId = userid
    }

    @PrimaryColumn()
    readonly id: number

    @Column()
    readonly session: string

    @Column()
    readonly userId: number

    static getSession = async () => {
        const s = await SessionUser.find()
        if (s.length === 0) return undefined

        return s[0]
    }
    static setSession = async (session: string, userId: number) => {
        const s = new SessionUser(session, userId)
        //console.log('ssssssss', s)
        try {
            await s.save()
        } catch (error) {
            console.log('eeeerrrrroooorrrr', error)
        }

    }
    static delSession = async () => {
        await SessionUser.delete(1)
    }
}