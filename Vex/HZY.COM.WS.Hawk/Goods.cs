﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Collections;
using HZY.COM;
using HZY.COM.Common;
using HZY.COM.Common.DBAccess;
using HZY.COM.WS.DataSets;
using HZY.COM.Common.Base;

/// 类名：Goods
/// 类说明：对Goods(商品的增删改查)的CRUD,为Easyui专用
/// 创建人：郭琦琦
/// 创建日期：2014-06-03 
/// 修改人：刘洪
/// 修改日期：2014-10-09
/// 修改内容：增加产品线字段
/// 
/// 修改人:刘洪
/// 修改日期:2014-11-15
/// 修改内容:修改自动生成SKU的逻辑

namespace HZY.COM.WS.Hawk
{
    public class Goods : HZYLogicBase, ILogicGetData
    {
        #region 构造函数
        public Goods()
        {
            this.m_SessionCheck = true;
        }
        #endregion

        #region 内部变量

        private Dbconn conn = new Dbconn("Hawk");
        private DataTable dt_EditResult = new dsCommon.dtResultDataTable();
        DateTime timeNow = DateTime.Now;
        DataSet ds = new DataSet();
        DataSet ds_Return = new DataSet();
        DataTable resultTable = new DataTable();

        #endregion

        #region GetData
        /// <summary>
        /// VEX框架的主入口
        /// </summary>
        /// <returns></returns>
        public DataSet GetData()
        {
            try
            {
                string strXML = "";//初始化XML
                string filter = "";//初始化模糊查询条件
                string strZT = "";//获取帐套
                strXML = m_request.Tables[0].Rows[0]["XML"].ToString();

                ds = Common.Common.GetDSByExcelXML(strXML);
                DataTable dt_OPTYPE = ds.Tables["OPTYPE"];

                if (ds.Tables["list"].Columns.Contains("zt"))
                {
                    strZT = ds.Tables["list"].Rows[0]["zt"].ToString();  // 获取事业体GL/LX
                }
                else
                {
                    strZT = "LX";     //2015-01-05  等集团版上线时  改成抛出未获取到事业体异常
                }
                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GoodsInfo".ToUpper())//商品信息查询无分页带模糊查询
                {
                    filter = m_request.Tables[0].Rows[0]["q"].ToString(); // 实时条件，用于下拉框查询数据
                    GetGoodsInfo(filter, strZT);
                }
                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GoodsInfoForPageList".ToUpper())//商品信息查询有分页
                {
                    GoodsInfoForPageList(strZT);
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "EDITGoods".ToUpper())//商品新增修改操作
                {
                    EDITGoods(strZT);
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "AddSKU".ToUpper()) //生成SKU
                {
                    AddSKU(strZT);
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "deleteSKU".ToUpper())
                {
                    deleteSKU();
                }
                return ds_Return;
            }
            catch
            {
                conn.RollbackTransaction();
                throw;
            }
        }
        #endregion

        #region 内部函数

        #region 商品信息查询(无分页)带模糊
        /// <summary>
        /// 商品信息查询(无分页)带模糊
        /// </summary>
        private void GetGoodsInfo(string pstrQ, string strEVN)
        {
            string strSQL = @"
                                SELECT  t1.ST2_ImagePath ,--图片路径取SKC表
                                        t1.ST2_ID ,--SKC表GUID
                                        t3.ST1_SupplierCode ,--SKU表供应商编号
                                        ( SELECT    SP1_Name
                                          FROM      [B01_MDM].[SP1_Supplier]
                                          WHERE     t3.ST1_SupplierCode = SP1_SupplierCode AND t3.ST1_DIVI=SP1_DIVI
                                        ) SP1_Name ,--SUK表供应商名称
                                        ( SELECT    BR1_Name
                                          FROM      [B01_MDM].[BR1_Brand]
                                          WHERE     t3.ST1_BR1_BrandCode = BR1_BrandCode AND BR1_DIVI=t3.ST1_DIVI
                                        ) BR1_BrandName ,--品牌名称SKU表
		                                t3.ST1_SupperierStyle,--SKU供应商款号
		                                t1.ST2_SupperierColor,--SKC表供应商颜色
		                                t1.ST2_SupperierSKC,--SKC表供应商KSC
		                                t2.ST3_ST1_StyleCode ,--款号表 款号
		                                t1.ST2_Color,--KSC表颜色
		                                (SELECT CT1_KeyName FROM [M01_CONF].[CT0_CSYTAB]
		                                WHERE t1.ST2_Color = CT1_KeyID  AND CT1_Code= 'COLO' AND CT1_DIVI=t1.ST2_DIVI) CT1_KeyName ,
		                                t1.ST2_SKCCode, --skc颜色名称
		                                t3.ST1_Unit , --款号表单位
		                                t1.ST2_PurchasePrice,--SKC表采购价格
		                                t1.ST2_SalePrice,--SKC表采购吊牌价
		                                t3.ST1_Years,--款号表年份
	                                    t3.ST1_Season,--款号表季节
		                                t3.ST1_Category,--款号表品类
		                                t3.ST1_LargeClass,--款号表大类
                                        t3.ST1_SmallClass,--款号表小类
		                                t3.ST1_Provenance, --款号表产地
                                        t3.ST1_Ingredients,  --款号成分
		                                t3.ST1_Grade ,--款号等级
		                                t3.ST1_Standard,--款号执行标准
		                                t3.ST1_SafeTechnology,--款号安全技术类别
		                                t3.ST1_IsPrint,--款号是否打印
                                        t3.ST1_State,--款号状态
		                                t3.ST1_LmDt,--款号更新时间
		                                t3.ST1_LmUser,--款号更新人
                                        t1.ST2_LmDt,
                                        t1.ST2_LmUser
                                FROM    [B01_MDM].[ST2_StyleColor] t1
                                        LEFT JOIN [B01_MDM].ST3_StyleColorSize t2 ON t1.ST2_SKCCode = t2.ST3_ST2_SKCCode AND t1.ST2_DIVI=t2.ST3_DIVI
                                        LEFT JOIN [B01_MDM].[ST1_Style] t3 ON t1.ST2_ST1_StyleCode  = t3.ST1_StyleCode AND t1.ST2_DIVI=t3.ST1_DIVI AND
                                        SP1_Name LIKE '%" + pstrQ + "%' Order by ST1_LmDt " + m_hzyPageInfo.Where;
            ds_Return = conn.GetDataSet(strSQL, new string[0]);
        }

        #endregion

        #region 商品信息查询(有分页)
        /// <summary>
        /// 商品信息查询(有分页)
        /// </summary>
        private void GoodsInfoForPageList(string strEVN)
        {
            //m_hzyPageInfo.Sort = " ST2_LmDt ";
            //m_hzyPageInfo.Order = " DESC ";
            string strSKC = "";
            if (ds.Tables["list"].Columns.Contains("ST2_SKCCode"))
            {
                strSKC = "AND ST2_SKCCode='" + ds.Tables["list"].Rows[0]["ST2_SKCCode"].ToString() + "' ";
            }
            string strSQL = @"
                              SELECT  *
                                            FROM    ( SELECT    t1.ST2_ImagePath ,--图片路径取SKC表
                                                                t1.ST2_ID ,--SKC表GUID
                                                                t3.ST1_SupplierCode ,--SKU表供应商编号
                                                                ( SELECT    SP1_Name
                                                                  FROM      [B01_MDM].[SP1_Supplier]
                                                                  WHERE     t3.ST1_SupplierCode = SP1_SupplierCode AND t3.ST1_DIVI=SP1_DIVI
                                                                ) SP1_Name ,--SUK表供应商名称
                                                                ( SELECT    BR1_Name
                                                                  FROM      [B01_MDM].[BR1_Brand]
                                                                  WHERE     t3.ST1_BR1_BrandCode = BR1_BrandCode AND BR1_DIVI=t3.ST1_DIVI
                                                                ) BR1_BrandName ,--品牌名称SKU表
                                                                t3.ST1_BR1_BrandCode ,
                                                                t3.ST1_ComModity , --款号品名
                                                                t3.ST1_SupperierStyle ,--SKU供应商款号
                                                                t1.ST2_SupperierColor ,--SKC表供应商颜色
                                                                t1.ST2_SupperierSKC ,--SKC表供应商KSC
                                                                t1.ST2_ST1_StyleCode ,--SKC 款号
                                                                t1.ST2_Color ,--KSC表颜色
                                                                ( SELECT    CT1_KeyName
                                                                  FROM      [M01_CONF].[CT0_CSYTAB]
                                                                  WHERE     t1.ST2_Color = CT1_KeyID
                                                                            AND CT1_Code = 'COLO' AND CT1_DIVI=t1.ST2_DIVI
                                                                ) CT1_KeyName ,
                                                                t1.ST2_SKCCode , --skc颜色名称
                                                                t3.ST1_Unit , --款号表单位
                                                                ( SELECT    CT1_KeyName
                                                                  FROM      [M01_CONF].[CT0_CSYTAB]
                                                                  WHERE     t3.ST1_Unit = CT1_KeyID
                                                                    AND CT1_Code = 'UNIT' AND CT1_DIVI=t3.ST1_DIVI
                                                                ) ST1_UnitName ,--单位名称
                                                                t3.ST1_Currency , -- 款号币种
                                                                t3.ST1_ID ,--款号GUID
                                                                t1.ST2_SizeGroup , -- KSC尺码组
                                                                t1.ST2_PurchasePrice ,--SKC表采购价格
                                                                t1.ST2_SalePrice ,--SKC表采购吊牌价
                                                                t1.ST2_RefSalePrice,--参考吊牌价
                                                                t3.ST1_Years ,--款号表年份
                                                                t3.ST1_Season ,--款号表季节
                                                                t3.ST1_Category ,--款号表品类
                                                                ( SELECT CT1_KeyName
																  FROM [M01_CONF].[CT0_CSYTAB]
																  WHERE t3.ST1_Category=CT1_KeyID
																  AND CT1_Code='ITCL' AND CT1_DIVI=t3.ST1_DIVI
																 )ST1_CategoryName,
                                                                t3.ST1_LargeClass ,--款号表大类
                                                                ( SELECT CT1_KeyName
																  FROM [M01_CONF].[CT0_CSYTAB]
																  WHERE  CT1_FatherID=(SELECT CT1_ID FROM [M01_CONF].[CT0_CSYTAB] WHERE CT1_KeyID=t3.ST1_Category
																  AND CT1_Code='ITCL') and CT1_OptionsValues=t3.ST1_LargeClass
																 )ST1_LargeClassName,
                                                                t3.ST1_SmallClass ,--款号表小类
                                                                ( SELECT CT1_KeyName
																  FROM [M01_CONF].[CT0_CSYTAB]
																  WHERE  CT1_OptionsValues=t3.ST1_SmallClass
																 )ST1_SmallClassName,
                                                                t3.ST1_Provenance , --款号表产地
                                                                t3.ST1_Ingredients ,  --款号成分
                                                                t3.ST1_Grade ,--款号等级
                                                                t3.ST1_Standard ,--款号执行标准
                                                                t3.ST1_SafeTechnology ,--款号安全技术类别
                                                                t3.ST1_IsPrint ,--款号是否打印
                                                                t3.ST1_State ,--款号状态
                                                                t3.ST1_LmDt ,--款号更新时间
                                                                t3.ST1_LmUser ,--款号更新人
                                                                t3.ST1_Series,
                                                                t3.ST1_StyleLine,
                                                                t3.ST1_Usedmethod,
                                                                t3.ST1_Attention,
                                                                t3.ST1_PermitNo,
                                                                t3.ST1_Fragrance,
                                                                t3.ST1_Netweight,
                                                                t3.ST1_ProductDate,
                                                                t3.ST1_Expiration,
                                                                t1.ST2_LmDt ,
                                                                t1.ST2_LmUser ,
                                                                CONVERT(NVARCHAR(100),t1.ST2_RgDt,23) ST2_RgDt ,
                                                                t1.ST2_RgUser ,
                                                                t1.ST2_State ,
                                                                CASE WHEN ISNULL(t1.st2_upload, '0') = '0' THEN '未导入'
                                                                     WHEN t1.st2_upload = '1' THEN '执行成功'
                                                                     WHEN t1.st2_upload = '9' THEN '失败'
                                                                END st2_upload
                                                      FROM      [B01_MDM].[ST2_StyleColor] t1
                                                                LEFT JOIN [B01_MDM].[ST1_Style] t3 ON t1.ST2_ST1_StyleCode = t3.ST1_StyleCode AND t1.ST2_DIVI=t3.ST1_DIVI WHERE t1.ST2_DIVI='"
                + strEVN + "') T8888 WHERE 1 = 1 " + strSKC + m_hzyPageInfo.Where;
            ds_Return = conn.GetDataSetForPageList(strSQL, new string[0], m_hzyPageInfo);
        }
        #endregion

        #region 商品新增修改操作
        /// <summary>
        /// 商品新增修改操作
        /// </summary>
        private void EDITGoods(string strEVN)
        {
            string strST1 = ds.Tables["LIST"].Rows[0]["st1_id"].ToString();//取款式GUID
            string strST2 = ds.Tables["LIST"].Rows[0]["st2_id"].ToString();//取SKCGUID
            string strSKC = ds.Tables["LIST"].Rows[0]["ST2_SKCCode"].ToString();    //SKC
            string strStyCode = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString(); //StyleCode
            string strSizeGroup = ds.Tables["list"].Rows[0]["st2_sizegroup"].ToString(); //尺码组

            string strSQL = @"
                   SELECT COUNT(1) FROM [B01_MDM].[ST2_StyleColor]
                   WHERE [ST2_SKCCode] = '" + strSKC + "' AND ST2_DIVI='" + strEVN + "'";
            int iCount = Convert.ToInt32(conn.GetDataTableFirstValue(strSQL));

            if (strST1 == "" && strST2 == "") //新增
            {
                if (iCount != 0)
                {
                    dt_EditResult.Rows.Add(new object[] { false, "失败,所建款式已存在" });
                    ds_Return.Tables.Add(dt_EditResult);
                    return;
                };

                DataSet dsCreatDS = CreatTab();            //创建具有表头的DataSet
                ds.Tables["list"].Columns.Remove("st1_id");//移除GUID字段
                ds.Tables["list"].Columns.Remove("st2_id");//移除GUID字段
                strST1 = dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ID"].ToString();//该变量存新建style表的guid
                strST2 = dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ID"].ToString();//该变量存新建styleColor表的guid

                //给Style表赋值
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_StyleCode"] = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SupplierCode"] = ds.Tables["list"].Rows[0]["st1_suppliercode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_BrandID"] = strEVN;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_DIVI"] = strEVN;
                //dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attr02"] = ds.Tables["list"].Rows[0]["ST1_Attr02"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Series"] = ds.Tables["list"].Rows[0]["ST1_Series"].ToString();   //系列跟风格线字段修改成ST1_Series,ST1_StyleLine
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_StyleLine"] = ds.Tables["list"].Rows[0]["ST1_StyleLine"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SupperierStyle"] = ds.Tables["list"].Rows[0]["st1_supperierstyle"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Years"] = ds.Tables["list"].Rows[0]["st1_years"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ComModity"] = ds.Tables["list"].Rows[0]["st1_commodity"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Unit"] = ds.Tables["list"].Rows[0]["st1_unit"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Category"] = ds.Tables["list"].Rows[0]["st1_category"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LargeClass"] = ds.Tables["list"].Rows[0]["ST1_largeclass"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SmallClass"] = ds.Tables["list"].Rows[0]["ST1_SmallClass"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Grade"] = ds.Tables["list"].Rows[0]["ST1_Grade"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Currency"] = ds.Tables["list"].Rows[0]["ST1_Currency"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Provenance"] = ds.Tables["list"].Rows[0]["ST1_Provenance"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Ingredients"] = ds.Tables["list"].Rows[0]["ST1_Ingredients"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Standard"] = ds.Tables["list"].Rows[0]["ST1_Standard"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SafeTechnology"] = ds.Tables["list"].Rows[0]["ST1_SafeTechnology"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_BR1_BrandCode"] = ds.Tables["list"].Rows[0]["ST1_BR1_BrandCode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_State"] = ds.Tables["list"].Rows[0]["ST1_State"].ToString();
                dsCreatDS.Tables["dtST1"].Columns.Add("ST1_RgDt");
                dsCreatDS.Tables["dtST1"].Columns.Add("ST1_RgUser");
                dsCreatDS.Tables["dtST1"].Columns.Add("ST1_UptNo");
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_RgDt"] = timeNow;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_RgUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LmDt"] = timeNow;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LmUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_UptNo"] = "0";

                if (strEVN == "GL")
                {
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Season"] = ds.Tables["list"].Rows[0]["ST1_Season"].ToString(); //雅斓添加季节
                }
                if (strEVN == "LX")  //添加斓绣独有的属性
                {
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Usedmethod"] = ds.Tables["list"].Rows[0]["ST1_Usedmethod"].ToString();   //添加使用方法
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attention"] = ds.Tables["list"].Rows[0]["ST1_Attention"].ToString();     //注意事项
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_PermitNo"] = ds.Tables["list"].Rows[0]["ST1_PermitNo"].ToString();       //批准文号
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Fragrance"] = ds.Tables["list"].Rows[0]["ST1_Fragrance"].ToString();     //香味
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Netweight"] = ds.Tables["list"].Rows[0]["ST1_Netweight"].ToString();     //净含量
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ProductDate"] = ds.Tables["list"].Rows[0]["ST1_ProductDate"].ToString(); //生产日期
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Expiration"] = ds.Tables["list"].Rows[0]["ST1_Expiration"].ToString();   //保质期
                }

                //给StyleColor表赋值
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_RgDt");
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_RgUser");
                dsCreatDS.Tables["dtST2"].Columns.Add("ST2_UptNo");
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ST1_StyleCode"] = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SKCCode"] = ds.Tables["list"].Rows[0]["ST2_SKCCode"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_Color"] = ds.Tables["list"].Rows[0]["ST2_Color"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SizeGroup"] = ds.Tables["list"].Rows[0]["ST2_SizeGroup"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SupperierColor"] = ds.Tables["list"].Rows[0]["ST2_SupperierColor"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SupperierSKC"] = ds.Tables["list"].Rows[0]["ST2_SupperierSKC"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_PurchasePrice"] = ds.Tables["list"].Rows[0]["ST2_PurchasePrice"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ImagePath"] = ds.Tables["list"].Rows[0]["ST2_ImagePath"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_State"] = ds.Tables["list"].Rows[0]["ST1_State"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SalePrice"] = ds.Tables["list"].Rows[0]["ST2_SalePrice"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_DIVI"] = strEVN;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RgDt"] = timeNow;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RgUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_LmDt"] = timeNow;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_LmUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_UpLoad"] = "0";
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_UptNo"] = "0";
                if (strEVN == "GL")
                {
                    dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RefSalePrice"] = ds.Tables["list"].Rows[0]["ST2_RefSalePrice"].ToString();
                }

                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_ColorGroup");
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ColorGroup"] = "C-A";
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_ST1_StyleCode");//帐套


                bool bResult;
                conn.LockTableList.Add("B01_MDM.ST2_StyleColor");// 锁表
                conn.LockTableList.Add("B01_MDM.ST1_Style");

                conn.BeginTransaction(); // 开启事务
                bResult = conn.Insert("B01_MDM.ST1_Style", dsCreatDS.Tables["dtST1"]); //增加style数据
                bResult = conn.Insert("B01_MDM.ST2_StyleColor", dsCreatDS.Tables["dtST2"]);//增加styleColor数据
                //bResult = AutoSKU(strStyCode, strSKC, strSizeGroup, dsCreatDS.Tables["dtST3"]);    //增加SKU表数据
                if (bResult)
                {
                    dt_EditResult.Rows.Add(new object[] { true, "新增成功" });
                    dt_EditResult.Rows.Add(new object[] { "ST1_ID", strST1 });
                    dt_EditResult.Rows.Add(new object[] { "ST2_ID", strST2 });
                }
                else
                {
                    dt_EditResult.Rows.Add(new object[] { false, "新增失败" });
                }
                conn.CommitTransaction();   //提交事务

            }
            else if (strST2 != "" && iCount == 0) //只新增ST2_StyleColor表，修改style表
            {
                DataSet dsCreatDS = CreatTab();            //创建具有表头的DataSet
                ds.Tables["list"].Columns.Remove("st2_id");//移除GUID字段

                //该变量存新建styleColor表的guid
                strST2 = dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ID"].ToString();

                //Style表
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ID"] = strST1;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_StyleCode"] = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SupplierCode"] = ds.Tables["list"].Rows[0]["st1_suppliercode"].ToString();
                //dsCreatDS.Tables["dtST1"].Rows[0]["ST1_BrandID"] = strEVN;
                dsCreatDS.Tables["dtST1"].Columns.Remove("ST1_BrandID");
                //dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attr01"] = ds.Tables["list"].Rows[0]["ST1_Attr01"].ToString();
                //dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attr02"] = ds.Tables["list"].Rows[0]["ST1_Attr02"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Series"] = ds.Tables["list"].Rows[0]["ST1_Series"].ToString();   //系列跟风格线字段修改成ST1_Series,ST1_StyleLine
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_StyleLine"] = ds.Tables["list"].Rows[0]["ST1_StyleLine"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SupperierStyle"] = ds.Tables["list"].Rows[0]["st1_supperierstyle"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_BR1_BrandCode"] = ds.Tables["list"].Rows[0]["ST1_BR1_BrandCode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Years"] = ds.Tables["list"].Rows[0]["st1_years"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ComModity"] = ds.Tables["list"].Rows[0]["st1_commodity"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Unit"] = ds.Tables["list"].Rows[0]["st1_unit"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Category"] = ds.Tables["list"].Rows[0]["st1_category"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LargeClass"] = ds.Tables["list"].Rows[0]["ST1_largeclass"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SmallClass"] = ds.Tables["list"].Rows[0]["ST1_SmallClass"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Grade"] = ds.Tables["list"].Rows[0]["ST1_Grade"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Currency"] = ds.Tables["list"].Rows[0]["ST1_Currency"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Provenance"] = ds.Tables["list"].Rows[0]["ST1_Provenance"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Ingredients"] = ds.Tables["list"].Rows[0]["ST1_Ingredients"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Standard"] = ds.Tables["list"].Rows[0]["ST1_Standard"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SafeTechnology"] = ds.Tables["list"].Rows[0]["ST1_SafeTechnology"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_State"] = ds.Tables["list"].Rows[0]["ST1_State"].ToString();

                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LmDt"] = timeNow;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LmUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_DIVI"] = strEVN;
                if (strEVN == "GL") //雅斓独有的属性
                {
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Season"] = ds.Tables["list"].Rows[0]["ST1_Season"].ToString();
                }
                if (strEVN == "LX")//斓绣独有的属性
                {
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Usedmethod"] = ds.Tables["list"].Rows[0]["ST1_Usedmethod"].ToString();   //添加使用方法
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attention"] = ds.Tables["list"].Rows[0]["ST1_Attention"].ToString(); //注意事项
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_PermitNo"] = ds.Tables["list"].Rows[0]["ST1_PermitNo"].ToString(); //批准文号
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Fragrance"] = ds.Tables["list"].Rows[0]["ST1_Fragrance"].ToString(); //香味
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Netweight"] = ds.Tables["list"].Rows[0]["ST1_Netweight"].ToString(); //净含量
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ProductDate"] = ds.Tables["list"].Rows[0]["ST1_ProductDate"].ToString(); //生产日期
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Expiration"] = ds.Tables["list"].Rows[0]["ST1_Expiration"].ToString(); //保质期
                }

                //给StyleColor表赋值
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ST1_StyleCode"] = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SKCCode"] = ds.Tables["list"].Rows[0]["ST2_SKCCode"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_Color"] = ds.Tables["list"].Rows[0]["ST2_Color"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SizeGroup"] = ds.Tables["list"].Rows[0]["ST2_SizeGroup"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SupperierColor"] = ds.Tables["list"].Rows[0]["ST2_SupperierColor"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SupperierSKC"] = ds.Tables["list"].Rows[0]["ST2_SupperierSKC"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_PurchasePrice"] = ds.Tables["list"].Rows[0]["ST2_PurchasePrice"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SalePrice"] = ds.Tables["list"].Rows[0]["ST2_SalePrice"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ImagePath"] = ds.Tables["list"].Rows[0]["ST2_ImagePath"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_State"] = ds.Tables["list"].Rows[0]["ST1_State"].ToString();
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_RgDt");
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_RgUser");
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RgDt"] = timeNow;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RgUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_LmDt"] = timeNow;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_LmUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_DIVI"] = strEVN;
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_ColorGroup");
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ColorGroup"] = "C-A";
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_UpLoad"] = "0";
                dsCreatDS.Tables["dtST2"].Columns.Add("ST2_UptNo");
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_UptNo"] = "0";
                if (strEVN == "GL")
                {
                    dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RefSalePrice"] = ds.Tables["list"].Rows[0]["ST2_RefSalePrice"].ToString();
                }


                bool bResult;
                ArrayList listKey = new ArrayList();
                listKey.Add("ST1_ID");

                conn.BeginTransaction(); // 开启事务
                bResult = conn.Insert("B01_MDM.ST2_StyleColor", dsCreatDS.Tables["dtST2"]);//增加styleColor数据
                //bResult = AutoSKU(strStyCode, strSKC, strSizeGroup, dsCreatDS.Tables["dtST3"]);    //增加SKU表数据
                bResult = conn.Update("B01_MDM.ST1_Style", dsCreatDS.Tables["dtST1"], listKey);//修改style数据
                if (bResult)
                {
                    dt_EditResult.Rows.Add(new object[] { true, "新增成功" });
                    dt_EditResult.Rows.Add(new object[] { "ST1_ID", strST1 });
                    dt_EditResult.Rows.Add(new object[] { "ST2_ID", strST2 });
                }
                else
                {
                    dt_EditResult.Rows.Add(new object[] { false, "新增失败" });
                }
                conn.CommitTransaction();   //提交事务
            }
            else if (strST2 != "" && iCount != 0)  //修改
            {
                //Style表
                DataSet dsCreatDS = CreatTab();            //创建具有表头的DataSet
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ID"] = strST1;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_StyleCode"] = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SupplierCode"] = ds.Tables["list"].Rows[0]["st1_suppliercode"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SupperierStyle"] = ds.Tables["list"].Rows[0]["st1_supperierstyle"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_BR1_BrandCode"] = ds.Tables["list"].Rows[0]["ST1_BR1_BrandCode"].ToString();
                //dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attr01"] = ds.Tables["list"].Rows[0]["ST1_Attr01"].ToString();
                //dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attr02"] = ds.Tables["list"].Rows[0]["ST1_Attr02"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Series"] = ds.Tables["list"].Rows[0]["ST1_Series"].ToString();   //系列跟风格线字段修改成ST1_Series,ST1_StyleLine
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_StyleLine"] = ds.Tables["list"].Rows[0]["ST1_StyleLine"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Years"] = ds.Tables["list"].Rows[0]["ST1_Years"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ComModity"] = ds.Tables["list"].Rows[0]["ST1_ComModity"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Unit"] = ds.Tables["list"].Rows[0]["ST1_Unit"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Category"] = ds.Tables["list"].Rows[0]["ST1_Category"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LargeClass"] = ds.Tables["list"].Rows[0]["ST1_largeclass"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SmallClass"] = ds.Tables["list"].Rows[0]["ST1_SmallClass"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Grade"] = ds.Tables["list"].Rows[0]["ST1_Grade"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Currency"] = ds.Tables["list"].Rows[0]["ST1_Currency"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Provenance"] = ds.Tables["list"].Rows[0]["ST1_Provenance"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Ingredients"] = ds.Tables["list"].Rows[0]["ST1_Ingredients"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Standard"] = ds.Tables["list"].Rows[0]["ST1_Standard"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_SafeTechnology"] = ds.Tables["list"].Rows[0]["ST1_SafeTechnology"].ToString();
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_State"] = ds.Tables["list"].Rows[0]["ST1_State"].ToString();
                dsCreatDS.Tables["dtST1"].Columns.Remove("ST1_BrandID");
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LmDt"] = timeNow;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_LmUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST1"].Rows[0]["ST1_DIVI"] = strEVN;
                if (strEVN == "GL")
                {
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Season"] = ds.Tables["list"].Rows[0]["ST1_Season"].ToString();
                }
                if (strEVN == "LX")
                {
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Usedmethod"] = ds.Tables["list"].Rows[0]["ST1_Usedmethod"].ToString();   //添加使用方法
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Attention"] = ds.Tables["list"].Rows[0]["ST1_Attention"].ToString();     //注意事项
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_PermitNo"] = ds.Tables["list"].Rows[0]["ST1_PermitNo"].ToString();       //批准文号
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Fragrance"] = ds.Tables["list"].Rows[0]["ST1_Fragrance"].ToString();     //香味
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Netweight"] = ds.Tables["list"].Rows[0]["ST1_Netweight"].ToString();     //净含量
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_ProductDate"] = ds.Tables["list"].Rows[0]["ST1_ProductDate"].ToString(); //生产日期
                    dsCreatDS.Tables["dtST1"].Rows[0]["ST1_Expiration"] = ds.Tables["list"].Rows[0]["ST1_Expiration"].ToString();   //保质期
                }

                //给StyleColor表赋值
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ID"] = strST2;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ST1_StyleCode"] = ds.Tables["list"].Rows[0]["ST2_ST1_StyleCode"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SKCCode"] = ds.Tables["list"].Rows[0]["ST2_SKCCode"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_Color"] = ds.Tables["list"].Rows[0]["ST2_Color"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SizeGroup"] = ds.Tables["list"].Rows[0]["ST2_SizeGroup"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SupperierColor"] = ds.Tables["list"].Rows[0]["ST2_SupperierColor"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SupperierSKC"] = ds.Tables["list"].Rows[0]["ST2_SupperierSKC"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_PurchasePrice"] = ds.Tables["list"].Rows[0]["ST2_PurchasePrice"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_SalePrice"] = ds.Tables["list"].Rows[0]["ST2_SalePrice"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ImagePath"] = ds.Tables["list"].Rows[0]["ST2_ImagePath"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_State"] = ds.Tables["list"].Rows[0]["ST1_State"].ToString();
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_UpLoad"] = "0";
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_LmDt"] = timeNow;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_LmUser"] = this.hzyMessage.User_Name;
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_DIVI"] = strEVN;
                //dsCreatDS.Tables["dtST2"].Columns.Add("ST2_ColorGroup");
                dsCreatDS.Tables["dtST2"].Rows[0]["ST2_ColorGroup"] = "C-A";
                dsCreatDS.Tables["dtST2"].Columns.Remove("ST2_RgDt"); //更新的时候 删除创建人和创建时间字段
                dsCreatDS.Tables["dtST2"].Columns.Remove("ST2_RgUser");
                if (strEVN == "GL")
                {
                    dsCreatDS.Tables["dtST2"].Rows[0]["ST2_RefSalePrice"] = ds.Tables["list"].Rows[0]["ST2_RefSalePrice"].ToString();
                }


                bool bResult;
                conn.LockTableList.Add("B01_MDM.ST2_StyleColor");// 锁表
                conn.LockTableList.Add("B01_MDM.ST1_Style");

                conn.BeginTransaction(); // 开启事务
                ArrayList listKey = new ArrayList();
                listKey.Add("ST1_ID");
                bResult = conn.Update("B01_MDM.ST1_Style", dsCreatDS.Tables["dtST1"], listKey);//修改style数据

                listKey.Remove("ST1_ID");
                listKey.Add("ST2_ID");
                bResult = conn.Update("B01_MDM.ST2_StyleColor", dsCreatDS.Tables["dtST2"], listKey);//增加styleColor数据
                if (bResult)
                {
                    dt_EditResult.Rows.Add(new object[] { true, "修改成功" });
                    dt_EditResult.Rows.Add(new object[] { "ST1_ID", ds.Tables["list"].Rows[0]["ST1_ID"].ToString() });
                    dt_EditResult.Rows.Add(new object[] { "ST2_ID", ds.Tables["list"].Rows[0]["ST2_ID"].ToString() });
                }
                else
                {
                    dt_EditResult.Rows.Add(new object[] { false, "修改失败" });
                }
                conn.CommitTransaction();   //提交事务

            }
            ds_Return.Tables.Add(dt_EditResult);
        }
        #endregion

        #region 创建需要的DataSet

        private DataSet CreatTab()
        {
            DataSet dsReturn = new DataSet();

            DataTable dtST1 = new DataTable();  //Style
            DataTable dtST2 = new DataTable();  //StyleColor
            DataTable dtST3 = new DataTable();  //StyleColorSize
            DataRow drST1 = dtST1.NewRow();
            DataRow drST2 = dtST2.NewRow();
            dtST1.Rows.Add(drST1);
            dtST2.Rows.Add(drST2);

            System.Guid guid = System.Guid.NewGuid();               //Guid 类型
            string strGUID = System.Guid.NewGuid().ToString();      //直接返回字符串类型

            //style表
            dtST1.Columns.Add("ST1_ID");
            dtST1.Columns.Add("ST1_CONO");
            dtST1.Columns.Add("ST1_DIVI");
            dtST1.Columns.Add("ST1_StyleCode");
            dtST1.Columns.Add("ST1_SupplierCode");
            dtST1.Columns.Add("ST1_BR1_BrandCode");
            dtST1.Columns.Add("ST1_SupperierStyle");
            dtST1.Columns.Add("ST1_Years");
            dtST1.Columns.Add("ST1_Season");
            dtST1.Columns.Add("ST1_ComModity");
            dtST1.Columns.Add("ST1_Unit");
            dtST1.Columns.Add("ST1_Category");
            dtST1.Columns.Add("ST1_LargeClass");
            dtST1.Columns.Add("ST1_SmallClass");
            dtST1.Columns.Add("ST1_Grade");
            dtST1.Columns.Add("ST1_Currency");
            dtST1.Columns.Add("ST1_Provenance");
            dtST1.Columns.Add("ST1_Ingredients");
            dtST1.Columns.Add("ST1_Standard");
            //dtST1.Columns.Add("ST1_Attr01"); 
            dtST1.Columns.Add("ST1_Series"); //系列
            dtST1.Columns.Add("ST1_Attr02");
            dtST1.Columns.Add("ST1_SafeTechnology");
            dtST1.Columns.Add("ST1_IsPrint");
            dtST1.Columns.Add("ST1_State");
            dtST1.Columns.Add("ST1_LmDt");
            dtST1.Columns.Add("ST1_LmUser");
            dtST1.Columns.Add("ST1_StyleLine");
            dtST1.Columns.Add("ST1_Usedmethod");    //添加使用方法
            dtST1.Columns.Add("ST1_Attention");     //注意事项
            dtST1.Columns.Add("ST1_PermitNo");      //批准文号
            dtST1.Columns.Add("ST1_Fragrance");     //香味
            dtST1.Columns.Add("ST1_Netweight");     //净含量
            dtST1.Columns.Add("ST1_ProductDate");   //生产日期
            dtST1.Columns.Add("ST1_Expiration");    //保质期
            dtST1.Columns.Add("ST1_BrandID");
            //赋值
            dtST1.Rows[0]["ST1_ID"] = strGUID;
            dtST1.Rows[0]["ST1_CONO"] = "HYFG";
            dtST1.Rows[0]["ST1_IsPrint"] = 0;
            //dtST1.Rows[0]["ST1_DIVI"] = "LX";



            //StyleColor表
            dtST2.Columns.Add("ST2_ID");
            dtST2.Columns.Add("ST2_CONO");
            dtST2.Columns.Add("ST2_DIVI");
            dtST2.Columns.Add("ST2_ST1_StyleCode");
            dtST2.Columns.Add("ST2_SKCCode");
            dtST2.Columns.Add("ST2_Color");
            dtST2.Columns.Add("ST2_ColorGroup");
            dtST2.Columns.Add("ST2_SizeGroup");
            dtST2.Columns.Add("ST2_SupperierColor");
            dtST2.Columns.Add("ST2_SupperierSKC");
            dtST2.Columns.Add("ST2_PurchasePrice");
            dtST2.Columns.Add("ST2_SalePrice");
            dtST2.Columns.Add("ST2_RefSalePrice");
            dtST2.Columns.Add("ST2_ImagePath");
            dtST2.Columns.Add("ST2_State");
            dtST2.Columns.Add("ST2_RgDt");
            dtST2.Columns.Add("ST2_RgUser");
            dtST2.Columns.Add("ST2_LmDt");
            dtST2.Columns.Add("ST2_LmUser");
            dtST2.Columns.Add("ST2_UpLoad");

            //StyleCodeSize
            dtST3.Columns.Add("ST3_ID");
            dtST3.Columns.Add("ST3_CONO");
            dtST3.Columns.Add("ST3_DIVI");
            dtST3.Columns.Add("ST3_ST1_StyleCode");
            dtST3.Columns.Add("ST3_ST2_SKCCode");
            dtST3.Columns.Add("ST3_SupperierSize");
            dtST3.Columns.Add("ST3_SKUCode");
            dtST3.Columns.Add("ST3_Size");
            dtST3.Columns.Add("ST3_State");
            dtST3.Columns.Add("ST3_RgDt");
            dtST3.Columns.Add("ST3_RgUser");
            dtST3.Columns.Add("ST3_LmDt");
            dtST3.Columns.Add("ST3_LmUser");
            //赋值
            strGUID = System.Guid.NewGuid().ToString();
            dtST2.Rows[0]["ST2_ID"] = strGUID;
            dtST2.Rows[0]["ST2_CONO"] = "HYFG";
            //dtST2.Rows[0]["ST2_DIVI"] = strEVN;
            //将创建的表添加到DataSet中，并返回给Handle。
            dtST3.TableName = "dtST3";
            dtST2.TableName = "dtST2";
            dtST1.TableName = "dtST1";

            //将Dt添加到Ds中
            dsReturn.Tables.Add(dtST3);
            dsReturn.Tables.Add(dtST2);
            dsReturn.Tables.Add(dtST1);

            return dsReturn;
        }
        #endregion

        //        #region 根据尺码自动生成SKU
        //        /// <summary>
        //        /// 用于保存自动生成SKU（1-F码）
        //        /// </summary>
        //        /// <param name="pstrStyCode">StyleCode</param>
        //        /// <param name="pstrSKC">SKC</param>
        //        /// <param nmae="pstrSizeType">尺码组(等尺码组有后在使用该参数)</param>
        //        /// <param name="pstrDt">SKU表</param>
        //        /// <returns>返回创建成功或者失败的bool</returns>
        //        private bool AutoSKU(string pstrStyCode, string pstrSKC, string pstrSizeType, DataTable pstrDt)
        //        {

        //            string strSQL = @"SELECT [CT1_ID]
        //                                            ,[CT1_State]
        //                                        FROM [M01_CONF].[CT0_CSYTAB]
        //                                    WHERE CT1_CodeName = '尺码组' AND CT1_KeyID = '" + pstrSizeType + "'";

        //            DataTable dtGroup = conn.GetDataTable(strSQL);

        //            //尺码组状态
        //            string strGroupState = dtGroup.Rows[0]["CT1_State"].ToString();

        //            //获取父ID
        //            string strFatherID = dtGroup.Rows[0]["CT1_ID"].ToString();

        //            if (strGroupState == "90")
        //            {
        //                return true;
        //            };

        //            //获取尺码
        //            string strSizeSQL = @"SELECT [CT1_KeyID] 
        //                                          FROM [M01_CONF].[CT0_CSYTAB]
        //                                          WHERE CT1_CodeName = '尺码' AND CT1_State = '20' AND CT1_FatherID = '" + strFatherID + "'";

        //            DataTable dtSize = conn.GetDataTable(strSizeSQL);

        //            //获取尺码组的数量
        //            int sizeCount = dtSize.Rows.Count;

        //            if (sizeCount == 0)
        //            {
        //                return true;
        //            }
        //            bool bResult;

        //            for (int i = 0; i < sizeCount; i++)
        //            {
        //                //创建新行
        //                DataRow drDe = pstrDt.NewRow();
        //                pstrDt.Rows.Add(drDe);

        //                //生成GUID
        //                string strGUID = System.Guid.NewGuid().ToString();
        //                //生成尺码
        //                string strSize = dtSize.Rows[i]["CT1_KeyID"].ToString();

        //                pstrDt.Rows[i]["ST3_SKUCode"] = pstrSKC + strSize;
        //                pstrDt.Rows[i]["ST3_Size"] = strSize;
        //                pstrDt.Rows[i]["ST3_SupperierSize"] = "GYS0" + strSize;

        //                //赋值
        //                pstrDt.Rows[i]["ST3_ID"] = strGUID;
        //                pstrDt.Rows[i]["ST3_CONO"] = "HYFG";
        //                pstrDt.Rows[i]["ST3_DIVI"] = "LX";
        //                pstrDt.Rows[i]["ST3_ST1_StyleCode"] = pstrStyCode;
        //                pstrDt.Rows[i]["ST3_ST2_SKCCode"] = pstrSKC;
        //                pstrDt.Rows[i]["ST3_State"] = "20";
        //                pstrDt.Rows[i]["ST3_RgDt"] = timeNow;
        //                pstrDt.Rows[i]["ST3_RgUser"] = this.hzyMessage.User_Name;
        //                pstrDt.Rows[i]["ST3_LmDt"] = timeNow;
        //                pstrDt.Rows[i]["ST3_LmUser"] = this.hzyMessage.User_Name;

        //            };
        //            // 锁表
        //            conn.LockTableList.Add("[B01_MDM].[ST3_StyleColorSize]");
        //            bResult = conn.Insert("[B01_MDM].[ST3_StyleColorSize]", pstrDt); //增加SKU表数据
        //            return bResult;
        //        }
        //        #endregion

        #region 生成SKU
        private void AddSKU(string strEVN)
        {

            DataTable dtInsert = new DataTable(); //新增SKU表数据
            DataTable dtUpdate = new DataTable(); //修改SKU表数据
            dtInsert.Columns.Add("ST3_CONO");
            dtInsert.Columns.Add("ST3_DIVI");
            dtInsert.Columns.Add("ST3_ST1_StyleCode");
            dtInsert.Columns.Add("ST3_ST2_SKCCode");
            dtInsert.Columns.Add("ST3_SKUCode");
            dtInsert.Columns.Add("ST3_Size");
            dtInsert.Columns.Add("ST3_SupperierSize");
            dtInsert.Columns.Add("ST3_Spec");
            dtInsert.Columns.Add("ST3_State");
            dtInsert.Columns.Add("ST3_RgDt");
            dtInsert.Columns.Add("ST3_RgUser");
            dtInsert.Columns.Add("ST3_LmDt");
            dtInsert.Columns.Add("ST3_LmUser");


            dtUpdate.Columns.Add("ST3_ID");
            dtUpdate.Columns.Add("ST3_SupperierSize");
            dtUpdate.Columns.Add("ST3_Spec");
            dtUpdate.Columns.Add("ST3_LmUser");
            dtUpdate.Columns.Add("ST3_LmDt");


            for (int i = 0; i < ds.Tables["list"].Rows.Count; i++)
            {
                if (ds.Tables["list"].Rows[i]["st3_id"].ToString() != "") //修改SKU表数据      
                {
                    DataRow upRow = dtUpdate.NewRow();
                    dtUpdate.Rows.Add(upRow);
                    dtUpdate.Rows[dtUpdate.Rows.Count - 1]["ST3_ID"] = ds.Tables["list"].Rows[i]["st3_id"].ToString();
                    dtUpdate.Rows[dtUpdate.Rows.Count - 1]["ST3_SupperierSize"] = ds.Tables["list"].Rows[i]["st3_supperiersize"].ToString();
                    dtUpdate.Rows[dtUpdate.Rows.Count - 1]["ST3_Spec"] = ds.Tables["list"].Rows[i]["st3_spec"].ToString();
                    dtUpdate.Rows[dtUpdate.Rows.Count - 1]["ST3_LmUser"] = ds.Tables["list"].Rows[i]["st3_lmuser"].ToString();
                    dtUpdate.Rows[dtUpdate.Rows.Count - 1]["ST3_LmDt"] = DateTime.Now;

                }
                else  //新增SKU表数据
                {
                    DataRow inRow = dtInsert.NewRow();
                    dtInsert.Rows.Add(inRow);
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_CONO"] = "HYFG";
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_DIVI"] = strEVN;
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_ST1_StyleCode"] = ds.Tables["list"].Rows[i]["st3_st1_stylecode"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_Size"] = ds.Tables["list"].Rows[i]["st3_size"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_SupperierSize"] = ds.Tables["list"].Rows[i]["st3_supperiersize"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_ST2_SKCCode"] = ds.Tables["list"].Rows[i]["st3_st2_skccode"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_SKUCode"] = ds.Tables["list"].Rows[i]["st3_st2_skccode"].ToString() + ds.Tables["list"].Rows[i]["st3_size"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_Spec"] = ds.Tables["list"].Rows[i]["st3_spec"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_State"] = ds.Tables["list"].Rows[i]["st3_state"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_RgUser"] = ds.Tables["list"].Rows[i]["st3_rguser"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_RgDt"] = DateTime.Now;
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_LmUser"] = ds.Tables["list"].Rows[i]["st3_rguser"].ToString();
                    dtInsert.Rows[dtInsert.Rows.Count - 1]["ST3_LmDt"] = DateTime.Now;
                }
            }
            conn.LockTableList.Add("B01_MDM.ST3_StyleColorSize");
            conn.BeginTransaction();
            bool bResultUP = true;
            bool bResultIN = true;
            if (dtUpdate.Rows.Count > 0 && dtUpdate.Rows[0]["ST3_ID"].ToString() != "")
            {
                ArrayList listKey = new ArrayList();
                listKey.Add("ST3_ID");
                bResultUP = conn.Update("B01_MDM.ST3_StyleColorSize", dtUpdate, listKey);

            }
            if (dtInsert.Rows.Count > 0 && dtInsert.Rows[0]["ST3_ST2_SKCCode"].ToString() != "")
            {
                bResultIN = conn.Insert("B01_MDM.ST3_StyleColorSize", dtInsert);
            }

            if (bResultUP == true && bResultIN == true)
            {
                dt_EditResult.Rows.Add(new object[] { true, "修改成功" });
            }
            else
            {
                dt_EditResult.Rows.Add(new object[] { false, "修改失败" });
            }

            conn.CommitTransaction();
            ds_Return.Tables.Add(dt_EditResult);
        }
        #endregion

        #region 删除SKU
        private void deleteSKU()
        {
            string strReturn = "";
            bool bResult = false;
            //获取SKU,验证采购单中是否存在.如果存在,不能删除;否则，则伪删除(状态字段为99)
            string strSQL = @"
                                SELECT COUNT(PO2_ID) 
                                FROM [Hawk].[B02_BILL].[PO2_PODetail] 
                                WHERE [PO2_PD1_ProductCode]='";
            DataTable dltDT = new DataTable();
            dltDT.Columns.Add("ST3_ID");
            dltDT.Columns.Add("ST3_State");

            for (int i = 0; i < ds.Tables["list"].Rows.Count; i++)
            {
                string strSKU = ds.Tables["list"].Rows[i]["st3_skucode"].ToString();
                int intCount = Convert.ToInt32(conn.GetDataTableFirstValue(strSQL + strSKU + "'").ToString());
                if (intCount == 0)  //采购单中没有此SKU
                {
                    DataRow dltRow = dltDT.NewRow();
                    dltDT.Rows.Add(dltRow);
                    dltDT.Rows[dltDT.Rows.Count - 1]["ST3_ID"] = ds.Tables["list"].Rows[i]["st3_id"].ToString();
                    //dltDT.Rows[dltDT.Rows.Count - 1]["ST3_State"] = "99";

                }
                else
                {
                    strReturn = strReturn + "," + strSKU;
                }
            }
            if (strReturn == "")
            {
                ArrayList aList = new ArrayList();
                aList.Add("ST3_ID");
                conn.BeginTransaction();
                bResult = conn.Delete("B01_MDM.ST3_StyleColorSize", dltDT, aList);
                conn.CommitTransaction();
            }
            else
            {
                bResult = false;
            }
            if (bResult)
            {
                dt_EditResult.Rows.Add(new object[] { true, "删除成功" });
            }
            else
            {
                if (strReturn != "")
                {
                    dt_EditResult.Rows.Add(new object[] { false,"以下SKU：\n"+strReturn+"\n 已经生成采购单，不能删除" });
                }
                else
                {
                    dt_EditResult.Rows.Add(new object[] { false, "删除出现异常" });
                }
            }
            ds_Return.Tables.Add(dt_EditResult);
        }
        #endregion


        /*--------------------------------------------------Goods_New 新编码规则-------------------------------------------------------------*/


        #endregion
    }
}
