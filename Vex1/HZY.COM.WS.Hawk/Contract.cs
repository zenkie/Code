﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Collections;

using HZY.COM;
using HZY.COM.Common;
using HZY.COM.WS.DataSets;
using HZY.COM.Common.Base;
using HZY.COM.Common.DBAccess;

/// 类名：GL_ERP_Contract
/// 类说明：对GL_ERP_Contract(合同的增删改查)的CRUD,为Easyui专用
/// 创建人：刘洪
/// 创建日期：2014-04-03 
/// 修改人：马卫清
/// 修改日期：2014-05-22
/// 修改内容：对代码进行重新整理，没有修改任何逻辑
/// 

namespace HZY.COM.WS.Hawk
{
    /// <summary>
    /// 对GL_ERP_Contract(合同的增删改查)的CRUD,为Easyui专用
    /// </summary>
    public class Contract : HZYLogicBase, ILogicGetData
    {
        #region 构造函数
        public Contract()
        {
            this.m_SessionCheck = true;
        }
        #endregion

        #region 内部变量
        private Dbconn conn = new Dbconn("Hawk");
        private DataTable dt_EditResult = new dsCommon.dtResultDataTable();
        DateTime timeNow = DateTime.Now;

        private DataSet m_RequestXML = new DataSet();
        private DataSet m_ReturnData = new DataSet();
        #endregion

        #region 属性

        /// <summary>
        /// 不知道什么编号
        /// </summary>
        public string RegionCode { get; set; }

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

                //接收XML的内容
                string strXML = "";
                strXML = m_request.Tables[0].Rows[0]["XML"].ToString();
                m_RequestXML = Common.Common.GetDSByExcelXML(strXML);

                DataTable dt_OPTYPE = m_RequestXML.Tables["OPTYPE"];
                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GET".ToUpper())//取合同主界面Datagrid的数据.
                {
                    Get("");
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GETCONTRACTCOMBOGRID".ToUpper())//采购单下拉合同的数据抽取,有两个条件(q实时取条件)
                {
                    string strFilter = m_request.Tables[0].Rows[0]["q"].ToString();
                    GetContractComboGrid(strFilter);
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "INSERT".ToUpper())//新建合同的方法
                {
                    Insert();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "UPDATE".ToUpper())//修改合同内容的方法
                {
                    Update();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "UPDATEPO".ToUpper()) // 更新采购单主表的合同字段
                {
                    UpdatePO();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "CheckLink".ToUpper()) // 检查PO与CO是否关联
                {
                    CheckLink();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "DELETE".ToUpper()) //这里是伪删除，实则为UPDATE
                {
                    Delete();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "Audit".ToUpper())    //合同审核的方法
                {
                    Audit();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "Search".ToUpper())//合同查询按钮的方法
                {
                    Search();
                };
                return m_ReturnData;
            }
            catch
            {
                conn.RollbackTransaction();
                throw;
            };
        }

        #endregion

        #region 内部函数

        #region Get 取合同主界面Datagrid的数据
        /// <summary>
        /// 取合同主界面Datagrid的数据
        /// </summary>
        private void Get(string SQLWhere)
        {
            string strSQL = @"
                            SELECT
                            [a].[PC1_ID],
                            [a].[PC1_CONO],
                            [a].[PC1_DIVI],
                            [a].[PC1_ContractCode],
                            [a].[PC1_StateCode],
                            [a].[PC1_StateName],
                            [a].[PC1_Amount],
                            [a].[PC1_RegionCode],
                            [a].[PC1_RegionName],
                            [a].[PC1_POTypeCode],
                            [a].[PC1_POTypeName],
                            [a].[PC1_SP1_SupplierCode],
                            [e].[SP1_Name] AS [SP1_Name],
                            CONVERT(varchar(100), [a].[PC1_EffectDate], 23) as [PC1_EffectDate],
                            CONVERT(varchar(100), [a].[PC1_TerminationDate], 23) as [PC1_TerminationDate],
                            [a].[PC1_PaymentType],
                            [b].[CT1_Options] AS [PC1_PaymentTypeName],
                            [a].[PC1_Currency],
                            [c].[CT1_Options] AS [PC1_CurrencyName],
                            [a].[PC1_PaymentChannel],
                            [d].[CT1_Options] AS [PC1_PaymentchannelName],
                            [a].[PC1_ContractComment],
                            [a].[PC1_FilePath],
                            [a].[PC1_RgDt],
                            [a].[PC1_RgUser],
                            CONVERT(varchar(100), [a].[PC1_LmDt], 23) as [PC1_LmDt],
                            [a].[PC1_LmUser],
                            [a].[PC1_UptNo]
                            FROM [B02_BILL].[PC1_POContractHead] [a]
                            LEFT JOIN [M01_CONF].[CT0_CSYTAB] [b] ON [a].[pc1_paymenttype] = [b].[CT1_OptionsValues] AND [b].[CT1_DIVI] = [a].[PC1_DIVI]
                            LEFT JOIN [M01_CONF].[CT0_CSYTAB] [c] ON [a].[pc1_currency] = [c].[CT1_OptionsValues] AND [c].[CT1_DIVI] = [a].[PC1_DIVI]
                            LEFT JOIN [M01_CONF].[CT0_CSYTAB] [d] ON [a].[pc1_paymentchannel] = [d].[CT1_OptionsValues] AND [d].[CT1_DIVI] = [a].[PC1_DIVI] AND [d].[CT1_Code] = 'PYTP'
                            LEFT JOIN [B01_MDM].[SP1_Supplier] [e] ON [a].[PC1_SP1_SupplierCode] = [e].[SP1_SupplierCode]
                            WHERE [a].[PC1_StateCode] <> '3' " + SQLWhere + m_hzyPageInfo.Where;

            m_ReturnData = conn.GetDataSetForPageList(strSQL, new string[0], m_hzyPageInfo);
        }
        #endregion

        #region GetContractComboGrid 采购单下拉合同的数据抽取,有两个条件(q实时取条件)
        /// <summary>
        /// 采购单下拉合同的数据抽取,有两个条件(q实时取条件)
        /// </summary>
        /// <param name="pstrQ">实时取条件</param>
        private void GetContractComboGrid(string pstrQ)
        {
            string strSQL = @"
                            SELECT
                            [PC1_ID],
                            [PC1_CONO],
                            [PC1_DIVI],
                            [PC1_ContractCode],
                            [PC1_StateCode],
                            [PC1_StateName],
                            [PC1_Amount],
                            [PC1_RegionCode],
                            [PC1_RegionName],
                            [PC1_POTypeCode],
                            [PC1_POTypeName],
                            [PC1_SP1_SupplierCode],
                            CONVERT(varchar(100), [PC1_EffectDate], 23) as [PC1_EffectDate],
                            CONVERT(varchar(100), [PC1_TerminationDate], 23) as [PC1_TerminationDate],
                            [PC1_PaymentType],
                            [PC1_Currency],
                            [PC1_PaymentChannel],
                            [PC1_ContractComment],
                            [PC1_FilePath],
                            CONVERT(varchar(100), [PC1_RgDt], 23) as [PC1_RgDt],
                            [PC1_RgUser],
                            CONVERT(varchar(100), [PC1_LmDt], 23) as [PC1_LmDt],
                            [PC1_LmUser],
                            [PC1_UptNo]
                            FROM   [B02_BILL].[PC1_POContractHead]
                            WHERE  1=1 
                            AND PC1_ContractCode LIKE '%" + pstrQ + "%' " + m_hzyPageInfo.Where;

            m_ReturnData = conn.GetDataSetForPageList(strSQL, new string[0], m_hzyPageInfo);
        }
        #endregion

        #region Insert 新建合同
        /// <summary>
        /// 新建合同
        /// </summary>
        private void Insert()
        {
            string strRguser = this.hzyMessage.User_Name;
            string strRegionCode = m_RequestXML.Tables["list"].Rows[0]["pc1_RegionCode"].ToString();
            string strPOTypeCode = m_RequestXML.Tables["list"].Rows[0]["pc1_POTypeCode"].ToString();
            string strDIVI = "";
            if (m_RequestXML.Tables["list"].Columns.Contains("pc1_divi"))
            {
                strDIVI = m_RequestXML.Tables["list"].Rows[0]["pc1_divi"].ToString();
            }
            else
            {
                strDIVI = "LX";
            }
            System.Guid guid = System.Guid.NewGuid(); //Guid 类型
            string strPC1_Id = guid.ToString(); //直接返回字符串类型
            string strCodyType = "新增合同编号";
            m_RequestXML.Tables["list"].Rows[0]["pc1_id"] = strPC1_Id;
            m_RequestXML.Tables["list"].Rows[0]["pc1_rguser"] = strRguser;
            m_RequestXML.Tables["list"].Rows[0]["pc1_ContractCode"] = AutoKeyCode.GetMaxKeyCode(strCodyType, strRegionCode, strPOTypeCode, strDIVI, conn);

            bool bResult = false;
            conn.LockTableList.Add("B02_BILL.PC1_POContractHead");// 锁表
            conn.BeginTransaction(); // 开启事务
            bResult = conn.Insert("B02_BILL.PC1_POContractHead", m_RequestXML.Tables["List"]);
            conn.CommitTransaction();
            if (bResult)
            {
                dt_EditResult.Rows.Add(new object[] { true, "创建成功" });
            }
            else
            {
                dt_EditResult.Rows.Add(new object[] { false, "创建失败" });
            }
            m_ReturnData.Tables.Add(dt_EditResult);
        }
        #endregion

        #region Update 更新采购单主表的合同字段
        /// <summary>
        /// 更新采购单主表的合同字段
        /// </summary>
        private void Update()
        {
            bool bResult = false;
            string strLmuser = this.hzyMessage.User_Name;
            //ds.Tables["list"].Columns.Remove("PC1_SP1_SupplierCode");
            string id = m_RequestXML.Tables["list"].Rows[0]["PC1_ID"].ToString();
            m_RequestXML.Tables["list"].Rows[0]["PC1_LmDt"] = timeNow;
            m_RequestXML.Tables["list"].Rows[0]["PC1_LmUser"] = strLmuser;

            if (conn.GetDataTableRowCount("SELECT * FROM [B02_BILL].[PC1_POContractHead] WHERE pc1_id=" + "'" + id + "'AND PC1_StateCode <> '1'") != 0)
            {
                throw new Exception("该合同号状态异常");
            };
            ArrayList listKey = new ArrayList();
            listKey.Add("PC1_ID");

            conn.LockTableList.Add("B02_BILL.PC1_POContractHead");// 锁表
            conn.BeginTransaction(); // 开启事务
            bResult = conn.Update("B02_BILL.PC1_POContractHead", m_RequestXML.Tables["List"], listKey);
            conn.CommitTransaction();

            if (bResult)
            {
                dt_EditResult.Rows.Add(new object[] { true, "修改成功" });
            }
            else
            {
                dt_EditResult.Rows.Add(new object[] { false, "修改失败" });
            }
            m_ReturnData.Tables.Add(dt_EditResult);
        }
        #endregion

        #region UpdatePO 更新采购单主表的合同字段
        /// <summary>
        /// 更新采购单主表的合同字段
        /// </summary>
        private void UpdatePO()
        {
            bool bResult = false;
            m_RequestXML.Tables["list"].Columns.Remove("po1_cono");
            m_RequestXML.Tables["list"].Columns.Remove("po1_divi");
            m_RequestXML.Tables["list"].Columns.Remove("po1_pocode");
            m_RequestXML.Tables["list"].Columns.Remove("po1_potypecode");
            m_RequestXML.Tables["list"].Columns.Remove("po1_potypename");
            m_RequestXML.Tables["list"].Columns.Remove("po1_sppocode");
            m_RequestXML.Tables["list"].Columns.Remove("po1_hstate");
            m_RequestXML.Tables["list"].Columns.Remove("po1_lstate");
            m_RequestXML.Tables["list"].Columns.Remove("po1_br1_brandcode");
            m_RequestXML.Tables["list"].Columns.Remove("po1_suppliercode");
            m_RequestXML.Tables["list"].Columns.Remove("sp1_regionname");
            m_RequestXML.Tables["list"].Columns.Remove("po1_plandeliverydate");
            m_RequestXML.Tables["list"].Columns.Remove("po1_pznumber");
            m_RequestXML.Tables["list"].Columns.Remove("po1_ocurrencysums");
            m_RequestXML.Tables["list"].Columns.Remove("po1_dcurrencysums");
            m_RequestXML.Tables["list"].Columns.Remove("po1_currency");
            m_RequestXML.Tables["list"].Columns.Remove("po1_exchangerate");
            m_RequestXML.Tables["list"].Columns.Remove("po1_supplytax");
            m_RequestXML.Tables["list"].Columns.Remove("po1_transportratio");
            m_RequestXML.Tables["list"].Columns.Remove("po1_paymenttypename");
            m_RequestXML.Tables["list"].Columns.Remove("po1_paymentchannelname");
            m_RequestXML.Tables["list"].Columns.Remove("po1_increaseratio");
            m_RequestXML.Tables["list"].Columns.Remove("po1_tariffratio");
            m_RequestXML.Tables["list"].Columns.Remove("po1_rgdt");
            m_RequestXML.Tables["list"].Columns.Remove("po1_rguser");
            m_RequestXML.Tables["list"].Columns.Remove("po1_lmuser");
            m_RequestXML.Tables["list"].Columns.Remove("po1_lmdt");
            m_RequestXML.Tables["list"].Columns.Remove("po1_uptno");
            m_RequestXML.Tables["list"].Columns.Remove("sp1_name");
            m_RequestXML.Tables["list"].Columns.Remove("br1_name");
            m_RequestXML.Tables["list"].Columns.Remove("rowindex");
            ArrayList listKey = new ArrayList();
            listKey.Add("po1_id");
            conn.LockTableList.Add("B02_BILL.PO1_POHead");// 锁表
            conn.BeginTransaction(); // 开启事务
            bResult = conn.Update("B02_BILL.PO1_POHead", m_RequestXML.Tables["List"], listKey);
            conn.CommitTransaction();

            if (bResult)
            {
                dt_EditResult.Rows.Add(new object[] { true, "操作成功" });
            }
            else
            {
                dt_EditResult.Rows.Add(new object[] { false, "操作失败" });
            }
            m_ReturnData.Tables.Add(dt_EditResult);
        }
        #endregion

        #region CheckLink 检查PO与CO是否关联
        /// <summary>
        /// 检查PO与CO是否关联
        /// </summary>
        private void CheckLink()
        {
            for (int i = 0; i < m_RequestXML.Tables["list"].Rows.Count; i++)
            {
                string strCO = m_RequestXML.Tables["list"].Rows[i]["pc1_contractcode"].ToString();
                string strDIVI = m_RequestXML.Tables["list"].Rows[i]["pc1_divi"].ToString();
                string strSql = "SELECT 1 FROM [B02_BILL].[PO1_POHead] where PO1_DIVI = '" + strDIVI + "' AND PO1_PC1_ContractCode = '" + strCO + "'";
                if (conn.GetDataTableRowCount(strSql) == 0)
                {
                    dt_EditResult.Rows.Add(new object[] { true, "" });
                }
                else
                {
                    dt_EditResult.Rows.Add(new object[] { false, "该合同已关联采购单，无法删除" });
                    break;
                }
            };
            m_ReturnData.Tables.Add(dt_EditResult);
        }
        #endregion

        #region Delete 伪删除，实则为UPDATE
        /// <summary>
        /// 伪删除，实则为UPDATE
        /// </summary>
        private void Delete()
        {
            bool bResult = false;
            string strLmuser = this.hzyMessage.User_Name;
            m_RequestXML.Tables["list"].Columns.Remove("pc1_amount");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_cono");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_contractcode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_contractcomment");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_currency");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_currencyname");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_divi");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_effectdate");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_filepath");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymentchannel");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymentchannelname");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymenttype");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymenttypename");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_potypecode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_potypename");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_regioncode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_regionname");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_rgdt");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_rguser");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_sp1_suppliercode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_terminationdate");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_uptno");
            m_RequestXML.Tables["list"].Columns.Remove("rowindex");
            m_RequestXML.Tables["list"].Columns.Remove("sp1_name");
            for (int i = 0; i < m_RequestXML.Tables["list"].Rows.Count; i++)
            {
                string strId = m_RequestXML.Tables["list"].Rows[i]["PC1_ID"].ToString();
                string strStatus = conn.GetDataTableFirstValue("SELECT PC1_StateCode FROM B02_BILL.PC1_POContractHead WHERE PC1_ID = '" + strId + "'").ToString();

                if (strStatus == "2")
                {
                    throw new Exception("合同状态已审核，无法删除！");
                }
                else
                {
                    m_RequestXML.Tables["list"].Rows[i]["PC1_LmDt"] = timeNow;
                    m_RequestXML.Tables["list"].Rows[i]["PC1_LmUser"] = strLmuser;
                    m_RequestXML.Tables["list"].Rows[i]["PC1_StateCode"] = "3";
                    m_RequestXML.Tables["list"].Rows[i]["PC1_StateName"] = "已删除";
                };
            };
            ArrayList listKey = new ArrayList();
            listKey.Add("pc1_id");

            conn.LockTableList.Add("B02_BILL.PC1_POContractHead");// 锁表
            conn.BeginTransaction(); // 开启事务
            bResult = conn.Update("B02_BILL.PC1_POContractHead", m_RequestXML.Tables["List"], listKey);
            conn.CommitTransaction();
            if (bResult)
            {
                dt_EditResult.Rows.Add(new object[] { true, "删除成功" });
            }
            else
            {
                dt_EditResult.Rows.Add(new object[] { false, "删除失败" });
            };
            m_ReturnData.Tables.Add(dt_EditResult);
        }
        #endregion

        #region Audit 合同审核的方法
        /// <summary>
        /// 合同审核的方法
        /// </summary>
        private void Audit()
        {
            bool bResult = false;
            string lmuser = this.hzyMessage.User_Name;
            m_RequestXML.Tables["list"].Columns.Remove("pc1_amount");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_cono");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_contractcode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_contractcomment");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_currency");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_currencyname");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_divi");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_effectdate");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_filepath");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymentchannel");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymentchannelname");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymenttype");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_paymenttypename");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_potypecode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_potypename");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_regioncode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_regionname");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_rgdt");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_rguser");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_sp1_suppliercode");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_terminationdate");
            m_RequestXML.Tables["list"].Columns.Remove("pc1_uptno");
            m_RequestXML.Tables["list"].Columns.Remove("rowindex");
            m_RequestXML.Tables["list"].Columns.Remove("sp1_name");
            for (int i = 0; i < m_RequestXML.Tables["list"].Rows.Count; i++)
            {
                string strId = m_RequestXML.Tables["list"].Rows[i]["PC1_ID"].ToString();
                string strType = m_RequestXML.Tables["list"].Rows[i]["type"].ToString();
                if (strType == "1")
                {
                    string status = conn.GetDataTableFirstValue("SELECT PC1_StateCode FROM B02_BILL.PC1_POContractHead WHERE PC1_ID = '" + strId + "'").ToString();
                    if (status == "3")
                    {
                        throw new Exception("合同已删除，无法审核！");
                    }
                    else
                    {
                        m_RequestXML.Tables["list"].Rows[i]["PC1_LmDt"] = timeNow;
                        m_RequestXML.Tables["list"].Rows[i]["PC1_LmUser"] = lmuser;
                        m_RequestXML.Tables["list"].Rows[i]["PC1_StateCode"] = "2";
                        m_RequestXML.Tables["list"].Rows[i]["PC1_StateName"] = "已审核";
                    };
                }
                else
                {
                    string strStatus = conn.GetDataTableFirstValue("SELECT PC1_StateCode FROM B02_BILL.PC1_POContractHead WHERE PC1_ID = '" + strId + "'").ToString();
                    if (strStatus == "3")
                    {
                        throw new Exception("合同已删除，无法审核！");
                    }
                    else
                    {
                        m_RequestXML.Tables["list"].Rows[i]["PC1_LmDt"] = timeNow;
                        m_RequestXML.Tables["list"].Rows[i]["PC1_LmUser"] = lmuser;
                        m_RequestXML.Tables["list"].Rows[i]["PC1_StateCode"] = "1";
                        m_RequestXML.Tables["list"].Rows[i]["PC1_StateName"] = "已保存";
                    };
                };
            };
            m_RequestXML.Tables["list"].Columns.Remove("type");
            ArrayList listKey = new ArrayList();
            listKey.Add("pc1_id");

            conn.LockTableList.Add("B02_BILL.PC1_POContractHead");// 锁表
            conn.BeginTransaction(); // 开启事务
            bResult = conn.Update("B02_BILL.PC1_POContractHead", m_RequestXML.Tables["List"], listKey);
            conn.CommitTransaction();
            if (bResult)
            {
                dt_EditResult.Rows.Add(new object[] { true, "审核成功" });
            }
            else
            {
                dt_EditResult.Rows.Add(new object[] { false, "审核失败" });
            };
            m_ReturnData.Tables.Add(dt_EditResult);
        }
        #endregion

        #region Search 合同查询按钮
        /// <summary>
        /// 合同查询按钮
        /// </summary>
        private void Search()
        {
            string strWhere = "";
            string strContractCode = m_RequestXML.Tables["list"].Rows[0]["PC1_ContractCode"].ToString();
            string strSupplierCode = m_RequestXML.Tables["list"].Rows[0]["PC1_SP1_SupplierCode"].ToString();
            string strSupplierName = m_RequestXML.Tables["list"].Rows[0]["SupplierCodeName"].ToString();
            string strPo = m_RequestXML.Tables["list"].Rows[0]["PO"].ToString();
            string strSupplierPO = m_RequestXML.Tables["list"].Rows[0]["SupplierPO"].ToString();
            string strRguser = m_RequestXML.Tables["list"].Rows[0]["rguser"].ToString();
            if (strContractCode == "" && strSupplierCode == "" && strSupplierName == "" && strPo == "" && strSupplierPO == "" && strRguser == "")
            {
                strWhere = "AND 1=1";
            }
            else
            {
                if (strContractCode != "")
                {
                    strWhere += "AND [a].[PC1_ContractCode] like '%" + strContractCode + "%'";
                };
                if (strRguser != "")
                {
                    strWhere += "AND [a].[PC1_RgUser] like '%" + strRguser + "%'";
                };
                if (strSupplierCode != "")
                {
                    strWhere += "AND [a].[PC1_SP1_SupplierCode] like '%" + strSupplierCode + "%'";
                };
                if (strSupplierName != "")
                {
                    strWhere += "AND EXISTS (SELECT 1 FROM [B01_MDM].[SP1_Supplier] [e] WHERE [a].[PC1_SP1_SupplierCode] = [e].[SP1_SupplierCode] AND [e].SP1_Name like '%" + strSupplierName + "%')";
                };
                if (strPo != "")
                {
                    strWhere += "AND EXISTS (SELECT 1 FROM [B02_BILL].[PC2_POContractDetail] [b] WHERE [a].[PC1_ContractCode] = [b].[PC2_ContractCode] AND [b].[PC2_POCode] LIKE '%" + strPo + "%')";
                };
                if (strSupplierPO != "")
                {
                    strWhere += @"AND EXISTS(SELECT 1 FROM [B02_BILL].[PC2_POContractDetail] [b] WHERE [a].[PC1_ContractCode] = [b].[PC2_ContractCode] AND EXISTS (
                                        SELECT 1 FROM [B02_BILL].[PO1_POHead] [c] WHERE [b].[PC2_POCode] = [c].[PO1_POCode] AND 
                                        [c].[PO1_SPPOCode] LIKE '%" + strSupplierPO + @"%'))";
                };
            };
            //查询
            Get(strWhere);
        }
        #endregion

        #endregion

    }
}