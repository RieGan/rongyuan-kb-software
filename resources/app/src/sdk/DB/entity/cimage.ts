import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CImage extends BaseEntity {
    @PrimaryColumn()
    id?: number

    @Column()
    title?: string

    @Column()
    screen_type?: string

    @Column()
    create_at?: number

    @Column()
    company?: string

    @Column("simple-array")
    data?: Buffer
} 