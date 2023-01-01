import { DeviceType } from "../../DB/entity/device_type"
import { YC200AKKOCommon } from "./yc200/YC200AKKOCommon"
import { YC200Common } from "./yc200/YC200Common"
import { YC200_3084B } from "./yc200/yc200_3084b"
import { YC200_AC067 } from "./yc200/yc200_ac067"
import { YC200_ACR_PRO_68 } from "./yc200/yc200_acr_pro_68"
import { YC200_ACR_PRO_75 } from "./yc200/yc200_acr_pro_75"
import { YC200_B67 } from "./yc200/yc200_b67"
import { YC200_BK980 } from "./yc200/yc200_bk980"
import { YC200_DK2912 } from "./yc200/yc200_dk2912"
import { YC200_DK2922 } from "./yc200/yc200_dk2922"
import { YC200_DOMIKEY } from "./yc200/yc200_domikey"
import { YC200_F081 } from "./yc200/yc200_f081"
import { YC200_FEKER_IK75 } from "./yc200/yc200_feker_ik75"
import { YC200_FK2102 } from "./yc200/yc200_fk2102"
import { YC200_FK5011GB } from "./yc200/yc200_fk5011gb"
import { YC300_GM885 } from "./yc200/yc300_gm885"
import { YC200_HF67 } from "./yc200/yc200_hf67"
import { YC200_K220 } from "./yc200/yc200_k220"
import { YC200_K224 } from "./yc200/yc200_k224"
import { YC200_K232 } from "./yc200/yc200_k232"
import { YC200_K401T } from "./yc200/yc200_k401t"
import { YC200_K411T } from "./yc200/yc200_k411t"
import { YC200_K61 } from "./yc200/yc200_k61"
import { YC200_K87 } from "./yc200/yc200_k87"
import { YC200_K980 } from "./yc200/yc200_k980"
import { YC200_L10 } from "./yc200/yc200_l10"
import { YC200_L8 } from "./yc200/yc200_l8"
import { YC200_L9 } from "./yc200/yc200_l9"
import { YC200_LP84 } from "./yc200/yc200_lp84"
import { YC200_MK11 } from "./yc200/yc200_mk11"
import { YC200_MK15 } from "./yc200/yc200_mk15"
import { YC200_NJ68 } from "./yc200/yc200_nj68"
import { YC200_NJ80 } from "./yc200/yc200_nj80"
import { YC200_PC75B } from "./yc200/yc200_pc75b"
import { YC200_SG8821_24_2M_SINGLE } from "./yc200/yc200_sg8821_24_2m_single"
import { YC200_SG8835 } from "./yc200/yc200_sg8835"
import { YC200_SG8835_24_2M } from "./yc200/yc200_sg8835_24_2m"
import { YC200_SG8836_SINGLE_3M } from "./yc200/yc200_sg8836_single_3m"
import { YC200_SG8843 } from "./yc200/yc200_sg8843"
import { YC200_SG8845_24_SINGLE_2M } from "./yc200/yc200_sg8845_24_single_2m"
import { YC200_SG8857_24_SINGLE_2M } from "./yc200/yc200_sg8857_24_single_2m"
import { YC200_SK63 } from "./yc200/yc200_sk63"
import { YC200_SK66 } from "./yc200/yc200_sk66"
import { YC200_SK72 } from "./yc200/yc200_sk72"
import { YC200_VN66 } from "./yc200/yc200_vn66"
import { YC300_ALICE_DM } from "./yc200/yc300_alice_dm"
import { YC300_G691_KRUX_DM } from "./yc200/yc300_g691_krux_dm"
import { YC300_F108 } from "./yc200/yc300_f108"
import { YC300_CK75 } from "./yc200/yc300_ck75"
import { YC300_K235 } from "./yc200/yc300_k235"
import { YC300_K402T_SINGLE } from "./yc200/yc300_k402t_single"
import { YC300_K403T_SINGLE } from "./yc200/yc300_k403t_single"
import { YC300_MMD_K87PRO } from "./yc200/yc300_mmd_k87pro"
import { YC300_TK63PRO } from "./yc200/yc300_tk63pro"
import { YZW_GEMRISE_K68 } from "./yzw/yzw_gemrise_k68"
import { YZW_LP98_DM } from "./yzw/yzw_lp98_dm"
import { YC300_SG8835_2M_24_SINGLE } from "./yc200/yc300_sg8835_2m_24_single"
import { YC300_EK3000_2M_BT } from "./yc200/yc300_ek3000_2m_bt"
import { YC300_RX980 } from "./yc200/yc300_rx980"
import { YC300_HS_G20 } from "./yc200/yc300_hs_g20"
import { YC300_DZ61 } from "./yc200/yc300_dz61"
import { YC300_SG8925 } from "./yc200/yc300_sg8925"
import { YC300_5108B_PLUS_UK } from "./yc200/yc300_5108b_plus_uk"
import { YC300_GM807 } from "./yc200/yc300_gm807"
import { YC300_SG8886_SINGLE } from "./yc200/yc300_sg8886_single"
import { YC300_SG8886 } from "./yc200/yc300_sg8886"
import { YC300_SG8922 } from "./yc200/yc300_sg8922"
import { YC300_NK100 } from "./yc200/yc300_nk100"
import { YC300_5087BEU_PLUS_UK } from "./yc200/yc300_5087beu_plus_uk"
import { YC300_K402T } from "./yc200/yc300_k402t"
import { YC300_K403T } from "./yc200/yc300_k403t"
import { YC300_KG039 } from "./yc200/yc300_kg039"
import { YC300_DUKHARO_VN80 } from "./yc200/yc300_dukharo_vn80"
import { YC300_SK5 } from "./yc200/yc300_sk5"
import { YC300_ABKO_AR75 } from "./yc200/yc300_abko_ar75"
import { YC300_KG043 } from "./yc200/yc300_kg043"
import { YC300_75V5 } from "./yc200/yc300_75v5"
import { YC300_AK816 } from "./yc200/yc300_ak816"
import { YC300_DK730 } from "./yc200/yc300_dk730"
import { YC300_DK731 } from "./yc200/yc300_dk731"
import { YC300_3068B_PLUS } from "./yc200/yc300_3068b_plus"
import { YC300_5087B_PLUS } from "./yc200/yc300_5087b_plus"
import { YC300_VN96 } from "./yc200/yc300_vn96"
import { YC300_SG8835_SINGLE } from "./yc200/yc300_sg8835_single"
import { YC300_S68 } from "./yc200/yc300_s68"
import { YC300_K980 } from "./yc200/yc300_k980"
import { YC300_ZSX61 } from "./yc200/yc300_zsx61"
import { YC300_W_87 } from "./yc200/yc300_w_87"
import { YC300_YZ21_DM } from "./yc200/yc300_yz21_dm"
import { YC300_TH21_DM } from "./yc200/yc300_th21_dm"
import { YC300_SG8925_SINGLE } from "./yc200/yc300_sg8925_single"
import { YC300_KC21_DM } from "./yc200/yc300_kc21_dm"
import { YC300_DK732 } from "./yc200/yc300_dk732"
import { YC300_EC66 } from "./yc200/yc300_ec66"
import { YC300_3068BP_ISO_UK } from "./yc200/yc300_3068bp_iso_uk"
import { YC300_SG8857_SINGLE_3M } from "./yc200/yc300_sg8857_single_3m"
import { YC300_SK5_DM } from "./yc200/yc300_sk5_dm"
import { YC300_K401T } from "./yc200/yc300_k401t"
import { YC300_K9PRO } from "./yc200/yc300_k9Pro"
import { YC300_940V5 } from "./yc200/yc300_940v5"
import { YC300_S3087 } from "./yc200/yc300_s3087"
import { YC300_GI80 } from "./yc200/yc300_gi80"
import { YC300_T98 } from "./yc200/yc300_t98"
import { YC300_MAXFIT108_DM } from "./yc200/yc300_maxfit108_dm"
import { YC300_MAXFIT87_DM } from "./yc200/yc300_maxfit87_dm"
import { YC300_R87 } from "./yc200/yc300_r87"
import { YC300_Y68 } from "./yc200/yc300_y68"
import { YC300_YK700_24_2M } from "./yc200/yc300_yk700_24_2m"
import { YC300_YK700_BT_2M } from "./yc200/yc300_yk700_bt_2m"
import { YC300_KC108 } from "./yc200/yc300_kc108"
import { YC300_K219 } from "./yc200/yc300_k219"
import { YC300_K237 } from "./yc200/yc300_k237"
import { YC300_K239 } from "./yc200/yc300_k239"
import { YC300_KF100 } from "./yc200/yc300_kf100"
import { YC300_KF1800 } from "./yc200/yc300_kf1800"
import { YC300_SKYLINE87 } from "./yc200/yc300_skyline87"
import { YC300_GM081 } from "./yc200/yc300_gm081"
import { YC300_KB751 } from "./yc200/yc300_kb751"
import { YC300_KG045 } from "./yc200/yc300_kg045"
import { YC300_IK98 } from "./yc200/yc300_ik98"
import { YC300_5087SEU_DM } from "./yc200/yc300_5087seu_dm"
import { YC300_D84 } from "./yc200/yc300_d84"
import { YC300_61K_DM } from "./yc200/yc300_61k_dm"
import { YC300_GM885_DM } from "./yc200/yc300_gm885_dm"
import { YC300_SK81 } from "./yc200/yc300_sk81"
import { YC300_K224B } from "./yc200/yc300_k224b"
import { YC300_T98_DM } from "./yc200/yc300_t98_dm"
import { YC300_ACR_PRO75S_DM } from "./yc200/yc300_acr_pro75s_dm"
import { YC400_DK67_LANGAO3 } from "./yc200/yc400_dk67_langao3"
import { yc300_KIIBOOM81 } from "./yc200/yc300_kiiboom81"
import { YC300_5075B_PLUS_S } from "./yc200/yc300_5075b_plus_s"
import { YC300_ALICE_S_DM } from "./yc200/yc300_alice_s_dm"
import { YC300_MEK27_65_DM } from "./yc200/yc300_mek27_65_dm"
import { YC300_MK857_DM } from "./yc200/yc300_mk857_dm"
import { YC300_5075S_DM } from "./yc200/yc300_5075s_s_dm"
import { YC300_MEK26_75_DM } from "./yc200/yc300_mek26_75_dm"
import { YC300_MK15_DM } from "./yc200/yc300_mk15_dm"
import { YC300_MK15_UK } from "./yc200/yc300_mk15_uk"
import { YC300_MK857 } from "./yc200/yc300_mk857"
import { YC300_SG8821_24_2M_SINGLE } from "./yc200/yc300_sg8821_24_2m_single"
import { YC300_ACR_PRO68_S_DM } from "./yc200/yc300_acr_pro68_s_dm"
import { YC300_YK630US_A } from "./yc200/yc300_yk630us_a"
import { YC300_KG006_SINGLE } from "./yc200/yc300_kg006_single"
import { YC300_KT002B_BT_2M } from "./yc200/yc300_kt002b_bt_2m"
import { YC300_DK738 } from "./yc200/yc300_dk738"
import { YC300_DK733 } from "./yc200/yc300_dk733"
import { YC300_CK98 } from "./yc200/yc300_ck98"
import { yc300_HS_K61 } from "./yc200/yc300_hs_k61"
import { yc300_C84 } from "./yc200/yc300_c84"
import { yc300_MG108_DM } from "./yc200/yc300_mg108_dm"
import { YC300_SK6_DM } from "./yc200/yc300_sk6_dm"
import { YC300_SK6 } from "./yc200/yc300_sk6"
import { YC300_RS6 } from "./yc200/yc300_rs6"
import { YC300_5108S_WHITE_DM } from "./yc200/yc300_5108s_white_dm"
import { YC300_K64_SINGLE } from "./yc200/yc300_k64_single"
import { YC400_Y87 } from "./yc200/yc400_y87"
import { YC400_A84 } from "./yc200/yc400_a84"
import { YC300_YC75 } from "./yc200/yc300_yc75"
import { YC300_PC75S_S_DM } from "./yc200/yc300_pc75s_s_dm"
import { YC300_MKGA75_JP_24_2M } from "./yc200/yc300_mkga75_jp_24_2m"
import { YC300_MKGA75_24_2M } from "./yc200/yc300_mkga75_24_2m"
import { YC300_K980_OLED } from "./yc200/yc300_k980_oled"
import { YC300_5108_WHITE } from "./yc200/yc300_5108_white"
import { YC400_Y98 } from "./yc200/yc400_y98"
import { YC300_PC75_S_WHITE_PLUS } from "./yc200/yc300_pc75_s_white_plus"
import { YC300_PC75_S_PLUS } from "./yc200/yc300_pc75_s_plus"
import { YC300_M84X } from "./yc200/yc300_m84x"
import { YC400_NJ68 } from "./yc200/yc400_nj68"
import { YC300_PC98BPLUS_S } from "./yc200/yc300_pc98bplus_s"
import { YC300_PC98BPLUS_MAC_S } from "./yc200/yc300_pc98bplus_mac_s"
import { YC300_ACR68PILE } from "./yc200/yc300_acr68pile"
import { YC300_PC75_S_MAC_WHITE_PLUS } from "./yc200/yc300_pc75_s_mac_white_plus"
import { YC400_P98 } from "./yc200/yc400_p98"
import { YC300_5087BPLUS_MAC } from "./yc200/yc300_5087bplus_mac"
import { YC300_EP108 } from "./yc200/yc300_ep108"
import { YC300_DAXAM64 } from "./yc200/yc300_daxaM64"
import { YC300_K1PRO } from "./yc200/yc300_k1pro"
import { YC300_G98 } from "./yc200/yc300_g98"
import { YC300_G21 } from "./yc200/yc300_g21"
import { YC300_G20 } from "./yc200/yc300_g20"
import { YC300_3068BP_ISO_NE } from "./yc200/yc300_3068bp_iso_ne"
import { YC300_3068BP_ISO_DE } from "./yc200/yc300_3068bp_iso_de"
import { YC300_MEK18_21 } from "./yc200/yc300_mek18_21"
import { YC300_SPR67_NOLED_DM } from "./yc200/yc300_spr67_noled_dm"
import { YC400_K401T_UK } from "./yc200/yc400_k401t_uk"
import { YC400_K403T_UK } from "./yc200/yc400_k403t_uk"
import { YC300_3084BP_ISO_NE } from "./yc200/yc300_3084bp_iso_ne"
import { YC300_5087BP_ISO_NE_DM } from "./yc200/yc300_5087bp_iso_ne_dm"
import { YC300_5108BP_ISO_NE } from "./yc200/yc300_5108bp_iso_ne"
import { YC300_DAGK6068 } from "./yc200/yc300_dagk6068"
import { YC300_KG006_DM } from "./yc200/yc300_kg006_dm"
import { YC300_KG033 } from "./yc200/yc300_kg033"
import { YC300_SKY68 } from "./yc200/yc300_sky68"
import { YC300_ZKYC61 } from "./yc200/yc300_zkyc61"
import { YC300_ZKYC61_DM } from "./yc200/yc300_zkyc61_dm"
import { YC300_MK20 } from "./yc200/yc300_mk20"
import { YC300_H75S } from "./yc200/yc300_h75s"
import { YC300_MOD007_NOLED_DM } from "./yc200/yc300_mod007_noled_dm"
import { YC300_5075BPLUS_S_WHITE } from "./yc200/yc300_5075bplus_s_white"
import { YC300_5087_ISO_DM } from "./yc200/yc300_5087_iso_dm"
import { YC300_YZI66 } from "./yc200/yc300_yzi66"
import { YC300_YZI108 } from "./yc200/yc300_yzi108"
import { YC300_M1_DM } from "./yc200/yc300_m1_dm"
import { YC300_ACRTOP101_DM } from "./yc200/yc300_acrtop101_dm"



export const findYC300Dev = (dev: DeviceType, devName?: string) => {
    switch (devName) {
        case 'yc200common':
            return new YC200Common(dev)
        case 'yc200_nj80':
            return new YC200_NJ80(dev)
        case 'yc200_bk980':
            return new YC200_BK980(dev)
        case 'yc200_k220':
            return new YC200_K220(dev)
        case 'yc200_5108':
            return new YC200AKKOCommon(dev)
        case 'yc200_hf67':
            return new YC200_HF67(dev)
        case 'yc200_k411t':
            return new YC200_K411T(dev)
        case 'yc200_lp84':
            return new YC200_LP84(dev)
        case 'yc200_dk2912':
            return new YC200_DK2912(dev)
        case 'yc200_dk2922':
            return new YC200_DK2922(dev)
        case 'yc200_vn66':
            return new YC200_VN66(dev)
        case 'yc300_gm885':
            return new YC300_GM885(dev)
        case 'yc200_sg8821_24_2m_single':
            return new YC200_SG8821_24_2M_SINGLE(dev)
        case 'yc200_sg8843':
            return new YC200_SG8843(dev)
        case 'yc200_sg8835_bt_2m':
            return new YC200_SG8835(dev)
        case 'yc200_sg8835_24_2m':
            return new YC200_SG8835_24_2M(dev)
        case 'yc200_lk67':
            return new YC200_HF67(dev)
        case 'yc200_sk72':
            return new YC200_SK72(dev)
        case 'yc200_k401t':
            return new YC200_K401T(dev)
        case 'yc200_k61':
            return new YC200_K61(dev)
        case 'yc200_k87':
            return new YC200_K87(dev)
        case 'yc200_sg8857_24_single_2m':
            return new YC200_SG8857_24_SINGLE_2M(dev)
        case 'yc200_fk5011gb':
            return new YC200_FK5011GB(dev)
        case 'yc200_3084b':
            return new YC200_3084B(dev)
        case 'yc200_mk15':
            return new YC200_MK15(dev)
        case 'yc200_ac067':
            return new YC200_AC067(dev)
        case 'yc200_sg8845_24_single_2m':
            return new YC200_SG8845_24_SINGLE_2M(dev)
        case 'yc200_k980':
            return new YC200_K980(dev)
        case 'yc200_l8':
            return new YC200_L8(dev)
        case 'yc200_l9':
            return new YC200_L9(dev)
        case 'yc200_nj68':
            return new YC200_NJ68(dev)
        case 'yc200_sg8836_single_3m':
            return new YC200_SG8836_SINGLE_3M(dev)
        case 'yc200_b67':
            return new YC200_B67(dev)
        case 'yc200_fk2102':
            return new YC200_FK2102(dev)
        case 'yc200_k224':
            return new YC200_K224(dev)
        case 'yc200_feker_ik75':
            return new YC200_FEKER_IK75(dev)
        case 'yc200_pc75b':
            return new YC200_PC75B(dev)
        case 'yc200_mk11':
            return new YC200_MK11(dev)
        case 'yc200_k232':
            return new YC200_K232(dev)
        case 'yc200_l10':
            return new YC200_L10(dev)
        case 'yc200_sk66':
            return new YC200_SK66(dev)
        case 'yc200_sk63':
            return new YC200_SK63(dev)
        case 'yzw_k68_2m_bt':
            return new YZW_GEMRISE_K68(dev)
        case 'yc200_domikey':
            return new YC200_DOMIKEY(dev)
        case 'yc200_f081':
            return new YC200_F081(dev)
        case 'yc200_acr_pro_68':
            return new YC200_ACR_PRO_68(dev)
        case 'yc200_acr_pro_75':
            return new YC200_ACR_PRO_75(dev)
        case 'yzw_k98_dm':
            return new YZW_LP98_DM(dev)
        case 'yc300_tk63pro':
            return new YC300_TK63PRO(dev)
        case 'yc300_mmd_k87pro':
            return new YC300_MMD_K87PRO(dev)
        case 'yc300_k402t_single':
            return new YC300_K402T_SINGLE(dev)
        case 'yc300_k403t_single':
            return new YC300_K403T_SINGLE(dev)
        case 'yc300_pc75s_dm':
            return new YC200_PC75B(dev)
        case 'yc300_f108':
            return new YC300_F108(dev)
        case 'yc300_ck75':
            return new YC300_CK75(dev)
        case 'yc300_k235':
            return new YC300_K235(dev)
        case 'yc300_alice_dm':
            return new YC300_ALICE_DM(dev)
        case 'yc300_g691_krux_dm':
            return new YC300_G691_KRUX_DM(dev)
        case 'yc300_sg8835_2m_24_single':
            return new YC300_SG8835_2M_24_SINGLE(dev)
        case 'yc300_g691_krux':
            return new YC300_G691_KRUX_DM(dev)
        case 'yc300_ek3000_2m_bt':
            return new YC300_EK3000_2M_BT(dev)
        case 'yc300_rx980':
            return new YC300_RX980(dev)
        case 'yc300_hs_g20':
            return new YC300_HS_G20(dev)
        case 'yc300_ac067_dm':
            return new YC200_AC067(dev)
        case 'yc300_dz61':
            return new YC300_DZ61(dev)
        case 'yc300_sg8925':
            return new YC300_SG8925(dev)
        case 'yc300_5108b_plus_uk':
            return new YC300_5108B_PLUS_UK(dev)
        case 'yc300_gm807':
            return new YC300_GM807(dev)
        case 'yc300_sg8886_single':
            return new YC300_SG8886_SINGLE(dev)
        case 'yc300_sg8886':
            return new YC300_SG8886(dev)
        case 'yc300_sg8922':
            return new YC300_SG8922(dev)
        case 'yc300_nk100':
            return new YC300_NK100(dev)
        case 'yc300_5087beu_plus_uk':
            return new YC300_5087BEU_PLUS_UK(dev)
        case 'yc300_k402t':
            return new YC300_K402T(dev)
        case 'yc300_k403t':
            return new YC300_K403T(dev)
        case 'yc300_kg039':
            return new YC300_KG039(dev)
        case 'yc300_dukharo_vn80':
            return new YC300_DUKHARO_VN80(dev)
        case 'yc300_sk5':
            return new YC300_SK5(dev)
        case 'yc300_abko_ar75':
            return new YC300_ABKO_AR75(dev)
        case 'yc300_kg043':
            return new YC300_KG043(dev)
        case 'yc300_75v5':
            return new YC300_75V5(dev)
        case 'yc300_ak816':
            return new YC300_AK816(dev)
        case 'yc300_dk730':
            return new YC300_DK730(dev)
        case 'yc300_dk731':
            return new YC300_DK731(dev)
        case 'yc300_5108s_dm':
            return new YC300_5108B_PLUS_UK(dev)
        case 'yc300_3068b_plus':
            return new YC300_3068B_PLUS(dev)
        case 'yc300_3068s_dm':
            return new YC300_3068B_PLUS(dev)
        case 'yc300_3084s_dm':
            return new YC200_3084B(dev)
        case 'yc300_5087b_plus':
            return new YC300_5087B_PLUS(dev)
        case 'yc300_5087s_dm':
            return new YC300_5087B_PLUS(dev)
        case 'yc300_5075s_dm':
            return new YC200_MK11(dev)
        case 'yc300_vn96':
            return new YC300_VN96(dev)
        case 'yc300_sg8835_single':
            return new YC300_SG8835_SINGLE(dev)
        case 'yc300_s68':
            return new YC300_S68(dev)
        case 'yc300_k980':
            return new YC300_K980(dev)
        case 'yc300_zsx61':
            return new YC300_ZSX61(dev)
        case 'yc300_sg8925_single':
            return new YC300_SG8925_SINGLE(dev)
        case 'yc300_w_87':
            return new YC300_W_87(dev)
        case 'yc300_yz21_dm':
            return new YC300_YZ21_DM(dev)
        case 'yc300_th21_dm':
            return new YC300_TH21_DM(dev)
        case 'yc300_kc21_dm':
            return new YC300_KC21_DM(dev)
        case 'yc300_dk732':
            return new YC300_DK732(dev)
        case 'yc300_ec66':
            return new YC300_EC66(dev)
        case 'yc300_3068bp_iso_uk':
            return new YC300_3068BP_ISO_UK(dev)
        case 'yc300_sg8857_single_3m':
            return new YC300_SG8857_SINGLE_3M(dev)
        case 'yc300_sk5_dm':
            return new YC300_SK5_DM(dev)
        case 'yc300_k401t':
            return new YC300_K401T(dev)
        case 'yc300_k9Pro':
            return new YC300_K9PRO(dev)
        case 'yc300_940v5':
            return new YC300_940V5(dev)
        case 'yc300_s3087':
            return new YC300_S3087(dev)
        case 'yc300_maxfit87_dm':
            return new YC300_MAXFIT87_DM(dev)
        case 'yc300_maxfit108_dm':
            return new YC300_MAXFIT108_DM(dev)
        case 'yc300_yk700_bt_2m':
            return new YC300_YK700_BT_2M(dev)
        case 'yc300_yk700_24_2m':
            return new YC300_YK700_24_2M(dev)
        case 'yc300_y68':
            return new YC300_Y68(dev)
        case 'yc300_r87':
            return new YC300_R87(dev)
        case 'yc300_gi80':
            return new YC300_GI80(dev)
        case 'yc300_t98':
            return new YC300_T98(dev)
        case 'yc300_kc108':
            return new YC300_KC108(dev)
        case 'yc300_k239':
            return new YC300_K239(dev)
        case 'yc300_k237':
            return new YC300_K237(dev)
        case 'yc300_k219':
            return new YC300_K219(dev)
        case 'yc300_kf1800':
            return new YC300_KF1800(dev)
        case 'yc300_kf100':
            return new YC300_KF100(dev)
        case 'yc300_skyline87':
            return new YC300_SKYLINE87(dev)
        case 'yc300_gm081':
            return new YC300_GM081(dev)
        case 'yc300_kg045':
            return new YC300_KG045(dev)
        case 'yc300_kb751':
            return new YC300_KB751(dev)
        case 'yc300_ik98':
            return new YC300_IK98(dev)
        case 'yc300_5087seu_dm':
            return new YC300_5087SEU_DM(dev)
        case 'yc300_d84':
            return new YC300_D84(dev)
        case 'yc300_61k_dm':
            return new YC300_61K_DM(dev)
        case 'yc300_gm885_dm':
            return new YC300_GM885_DM(dev)
        case 'yc300_fek75s':
            return new YC300_KB751(dev)
        case 'yc300_sk81':
            return new YC300_SK81(dev)
        case 'yc300_k224b':
            return new YC300_K224B(dev)
        case 'yc300_t98_dm':
            return new YC300_T98_DM(dev)
        case 'yc300_acr_pro75s_dm':
            return new YC300_ACR_PRO75S_DM(dev)
        case 'yc300_kiiboom81':
            return new yc300_KIIBOOM81(dev)
        case 'yc300_5075b_plus_s':
            return new YC300_5075B_PLUS_S(dev)
        case 'yc300_alice_s_dm':
            return new YC300_ALICE_S_DM(dev)
        case 'yc300_mek27_65_dm':
            return new YC300_MEK27_65_DM(dev)
        case 'yc300_5075s_s_dm':
            return new YC300_5075S_DM(dev)
        case 'yc300_mk15_dm':
            return new YC300_MK15_DM(dev)
        case 'yc300_mk15_uk':
            return new YC300_MK15_UK(dev)
        case 'yc300_mek26_75_dm':
            return new YC300_MEK26_75_DM(dev)
        case 'yc300_mk857_dm':
            return new YC300_MK857_DM(dev)
        case 'yc300_mk857':
            return new YC300_MK857(dev)
        case 'yc300_th96':
            return new YC300_VN96(dev)
        case 'yc300_sg8821_24_2m_single':
            return new YC300_SG8821_24_2M_SINGLE(dev)
        case 'yc300_acr_pro68_s_dm':
            return new YC300_ACR_PRO68_S_DM(dev)
        case 'yc300_yk630us_a':
            return new YC300_YK630US_A(dev)
        case 'yc300_kg006_single':
            return new YC300_KG006_SINGLE(dev)
        case 'yc300_kt002b_bt_2m':
            return new YC300_KT002B_BT_2M(dev)
        case 'yc300_dk733':
            return new YC300_DK733(dev)
        case 'yc300_dk738':
            return new YC300_DK738(dev)
        case 'yc300_ck98':
            return new YC300_CK98(dev)
        case 'yc300_hs_k61':
            return new yc300_HS_K61(dev)
        case 'yc300_c84':
            return new yc300_C84(dev)
        case 'yc300_mg108_dm':
            return new yc300_MG108_DM(dev)
        case 'yc300_sk6':
            return new YC300_SK6(dev)
        case 'yc300_sk6_dm':
            return new YC300_SK6_DM(dev)
        case 'yc300_5108s_white_dm':
            return new YC300_5108S_WHITE_DM(dev)
        case 'yc300_rs6':
            return new YC300_RS6(dev)
        case 'yc300_k64_single':
            return new YC300_K64_SINGLE(dev)
        case 'yc300_yc75':
            return new YC300_YC75(dev)
        case 'yc300_pc75s_s_dm':
            return new YC300_PC75S_S_DM(dev)
        case 'yc300_mkga75_jp_24_2m':
            return new YC300_MKGA75_JP_24_2M(dev)
        case 'yc300_mkga75_24_2m':
            return new YC300_MKGA75_24_2M(dev)
        case 'yc300_k980_oled':
            return new YC300_K980_OLED(dev)
        case 'yc300_5108_white':
            return new YC300_5108_WHITE(dev)
        case 'yc300_pc75_s_plus':
            return new YC300_PC75_S_PLUS(dev)
        case 'yc300_pc75_s_mac_white_plus':
            return new YC300_PC75_S_MAC_WHITE_PLUS(dev)
        case 'yc300_m84x':
            return new YC300_M84X(dev)
        case 'yc300_pc98bplus_s':
            return new YC300_PC98BPLUS_S(dev)
        case 'yc300_pc98bplus_mac_s':
            return new YC300_PC98BPLUS_MAC_S(dev)
        case 'yc300_acr68pile':
            return new YC300_ACR68PILE(dev)
        case 'yc300_pc75_s_white_plus':
            return new YC300_PC75_S_WHITE_PLUS(dev)
        case 'yc300_5087bplus_mac':
            return new YC300_5087BPLUS_MAC(dev)
        case 'yc300_ep108':
            return new YC300_EP108(dev)
        case 'yc300_daxaM64':
            return new YC300_DAXAM64(dev)
        case 'yc300_k1pro':
            return new YC300_K1PRO(dev)
        case 'yc300_g98':
            return new YC300_G98(dev)
        case 'yc300_g21':
            return new YC300_G21(dev)
        case 'yc300_g20':
            return new YC300_G20(dev)
        case 'yc300_3068bp_iso_ne':
            return new YC300_3068BP_ISO_NE(dev)
        case 'yc300_3068bp_iso_de':
            return new YC300_3068BP_ISO_DE(dev)
        case 'yc300_mek18_21':
            return new YC300_MEK18_21(dev)
        case 'yc300_spr67_noled_dm':
            return new YC300_SPR67_NOLED_DM(dev)
        case 'yc300_dagk6068':
            return new YC300_DAGK6068(dev)
        case 'yc300_3084bp_iso_ne':
            return new YC300_3084BP_ISO_NE(dev)
        case 'yc300_zkyc61_dm':
            return new YC300_ZKYC61_DM(dev)
        case 'yc300_5087bp_iso_ne_dm':
            return new YC300_5087BP_ISO_NE_DM(dev)
        case 'yc300_5108bp_iso_ne':
            return new YC300_5108BP_ISO_NE(dev)
        case 'yc300_kg006_dm':
            return new YC300_KG006_DM(dev)
        case 'yc300_kg033':
            return new YC300_KG033(dev)
        case 'yc300_sky68':
            return new YC300_SKY68(dev)
        case 'yc300_zkyc61':
            return new YC300_ZKYC61(dev)
        case 'yc300_mk20':
            return new YC300_MK20(dev)
        case 'yc300_h75s':
            return new YC300_H75S(dev)
        case 'yc300_mod007_noled_dm':
            return new YC300_MOD007_NOLED_DM(dev)
        case 'yc300_5075bplus_s_white':
            return new YC300_5075BPLUS_S_WHITE(dev)
        case 'yc300_5087_iso_dm':
            return new YC300_5087_ISO_DM(dev)
        case 'yc300_yzi66':
            return new YC300_YZI66(dev)
        case 'yc300_yzi108':
            return new YC300_YZI108(dev)
        case 'yc300_m1_dm':
            return new YC300_M1_DM(dev)
        case 'yc300_acrtop101_dm':
            return new YC300_ACRTOP101_DM(dev)
        case 'yc400_dk67_langao3':
            return new YC400_DK67_LANGAO3(dev)
        case 'yc400_y87':
            return new YC400_Y87(dev)
        case 'yc400_a84':
            return new YC400_A84(dev)
        case 'yc400_y98':
            return new YC400_Y98(dev)
        case 'yc400_nj68':
            return new YC400_NJ68(dev)
        case 'yc400_p98':
            return new YC400_P98(dev)
        case 'yc400_k401t_uk':
            return new YC400_K401T_UK(dev)
        case 'yc400_k403t_uk':
            return new YC400_K403T_UK(dev)
        default:
            return undefined
    }
}