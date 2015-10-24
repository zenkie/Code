﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Text;
using System.Collections;
using System.IO;

using HZY.COM;
using HZY.COM.Common;
using HZY.COM.Common.DBAccess;
using HZY.COM.WS.DataSets;
using HZY.COM.Common.Base;

/// 类名：VIPPersonnel
/// 类说明：对VIPPersonnel(VIP会员管理)
/// 创建人：郭琦琦
/// 创建日期：2014-07-30 
/// 修改人：
/// 修改日期：
/// 修改内容：

namespace HZY.COM.WS.StoreBusinessSystem
{
    public class VIPPersonnel : HZYLogicBase, ILogicGetData
    {
        #region 构造函数
        public VIPPersonnel()
        {
            this.m_SessionCheck = true;
        }
        #endregion

        #region 内部变量

        private Dbconn m_conn = new Dbconn("F22XY");
        private Dbconn m_conn_GP = new Dbconn("F22GP");
        private Dbconn m_conn_DL = new Dbconn("F22DL");
        private DataTable dt_EditResult = new dsCommon.dtResultDataTable();
        DataSet ds = new DataSet();
        DataSet ds_Return = new DataSet();
        DataTable resultTable = new DataTable();
        DataTable dtList = new DataTable();
        DateTime timeNow = DateTime.Now;
        string filter = "";

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
                string strXML = "";
                strXML = m_request.Tables[0].Rows[0]["XML"].ToString();
                ds = Common.Common.GetDSByExcelXML(strXML);
                DataTable dt_OPTYPE = ds.Tables["OPTYPE"];
                filter = m_request.Tables[0].Rows[0]["q"].ToString();
                dtList = ds.Tables["List"];

                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GetVIPPersonnel".ToUpper())//查询VIP积分
                {
                    GetVIPPersonnel(dtList);
                }
                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "EDITVIPPersonnel".ToUpper())//积分兑换劵
                {
                    EDITVIPPersonnel(dtList);
                }
                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "Getemployee".ToUpper())//获取客户经理
                {
                    Getemployee(dtList);
                }
                if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "Getlookname".ToUpper())//获取职业
                {
                    Getlookname(dtList);
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GetIndividuation".ToUpper())//贵属性
                {
                    GetIndividuation();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GetSize".ToUpper()) {
                    GetSize();
                }
                else if (dt_OPTYPE.Rows[0][0].ToString().ToUpper() == "GetReferee".ToUpper())
                {
                    GetReferee();
                }
                return ds_Return;
            }
            catch
            {
                m_conn.RollbackTransaction();
                throw;
            }
        }
        #endregion

        #region 内部函数

        #region 查询VIP会员
        /// <summary>
        /// 查询VIP会员
        /// </summary>
        private void GetVIPPersonnel(DataTable pdt)
        {
            string search = "";
            if (pdt.Columns.Contains("search"))
            {
                search = pdt.Rows[0]["search"].ToString();//筛选条件
            }
            else
            {
                search = search;
            }

            string strSQL = @"SELECT   *
                                FROM    dbo.vip_user WITH ( NOLOCK )
                                WHERE   depotid = '" + hzyMessage.User_Name_CN.Substring(0, 8) + "'"
                                + m_hzyPageInfo.Where;
            string strWhereTmp = "AND ( vipname LIKE '%" + search + "%' or mobtel like  '%" + search + "%') ";
            ds_Return = m_conn.GetDataSetForPageList(strSQL + strWhereTmp, new string[0], m_hzyPageInfo);
        }
        #endregion


        #region 获取客户经理
        /// <summary>
        /// 获取客户经理
        /// </summary>
        private void Getemployee(DataTable pdt)
        {
            string depotid = pdt.Rows[0]["depotid"].ToString();//店铺编号
            string strSQL = @"SELECT employeeid,names FROM dbo.j_employee WHERE  valid='0' AND depotid='" + depotid + "'";
            ds_Return = m_conn.GetDataSet(strSQL, new string[0]);
        }
        #endregion

        #region 获取职业
        /// <summary>
        /// 获取职业
        /// </summary>
        private void Getlookname(DataTable pdt)
        {
            string strSQL = @"select lookname , lookname  lookname1 FROM j18_lookupsub WHERE lookupid='3001'";
            ds_Return = m_conn.GetDataSet(strSQL, new string[0]);
        }
        #endregion

        #region GetIndividuation
        private void GetIndividuation()
        {
            string lookid = dtList.Rows[0]["id"].ToString();

            string strSQL = @"select lookname , lookname AS lookname1 FROM j18_lookupsub WHERE lookupid = '" + lookid + "'";
            ds_Return = m_conn.GetDataSet(strSQL);
        }
        #endregion

        #region GetSize
        private void GetSize() {
            string strSQL = @"SELECT DISTINCT [sizeid],[sizeid] AS [s_name] FROM [dbo].[j_size]";
            ds_Return = m_conn.GetDataSet(strSQL);
        }
		 
	    #endregion

        #region VIP会员维护
        /// <summary>
        /// VIP会员维护
        /// </summary>
        private void EDITVIPPersonnel(DataTable pdt)
        {
            string vipid = "";//VIPid

            string strMaxvipcode;//VIP卡号最大值
            string strdepotid = pdt.Rows[0]["depotid"].ToString();//VIP店铺编号
            string strvipcode = pdt.Rows[0]["vipcode"].ToString();//VIP卡号
            string strmobtel = pdt.Rows[0]["mobtel"].ToString();//VIP手机

            string strParentid = m_conn_GP.GetDataTableFirstValue(" SELECT unitid FROM dbo.j_depot WITH(NOLOCK)  WHERE   depotid = '" + strdepotid + "'", new string[] { }).ToString();

            if (strParentid == "" || strParentid == null)
            {
                throw new Exception("请联系管理员！"); ;
            }
            strParentid = strParentid.Trim();
            string strlevel1_type = m_conn.GetDataTableFirstValue(" SELECT level1_type FROM   [DRP_REPORT].[dbo].[Y_NPAIN_VIP_Config]  WITH(NOLOCK)  WHERE   merchantid = '" + strParentid + "'", new string[] { }).ToString();
            //string strlevel1_type = m_conn.GetDataTableFirstValue(" SELECT level1_type FROM   [DRP_REPORT].[dbo].[Y_NPAIN_VIP_Config]  WITH(NOLOCK)  WHERE   merchantid = 'Y0009'").ToString();

            if (strlevel1_type == "" || strlevel1_type == null)
            {
                throw new Exception("请联系管理员！"); ;
            }

            m_conn.BeginTransaction();

            //如果strvipcode 为空,新增,反之修改
            if (strvipcode == "")
            {

                #region 判断 vipcode 和 vipid
                string strflag = m_conn.GetDataTableFirstValue(" SELECT MAX(RIGHT(vipcardid,6))+1 FROM vip_cardvip WHERE LEFT(vipcardid,2)='NP'", new string[] { }).ToString();
                if (strflag == "")
                {
                    strMaxvipcode = "NP000000";
                }
                else
                {
                    strMaxvipcode = "NP" + Convert.ToInt32(strflag).ToString("000000");
                };
                pdt.Rows[0]["vipcode"] = strMaxvipcode;
                //验证手机号
                string strflagTEL = m_conn.GetDataTableFirstValue(@"
                        SELECT  A.*
                        FROM    dbo.vip_user a WITH ( NOLOCK )
                                INNER JOIN dbo.j_depot b WITH ( NOLOCK ) ON a.depotid = b.depotid
                                                                            AND b.unitid IN (
                                                                            SELECT  unitid
                                                                            FROM    dbo.j_depot WITH ( NOLOCK )
                                                                            WHERE   depotid = @Param0)
                        WHERE   A.mobtel = @Param1", new string[] { strdepotid, strmobtel }).ToString();
                if (strflagTEL == "1")
                {
                    throw new Exception("该手机号已经存在！");
                }

                int nNum = 1;//默认是0
                vipid = "NP" + hzyMessage.User_Name + "-" + DateTime.Now.ToString("yyyy-MM-dd") + "-" + nNum.ToString("0000");
                for (int j = 0; j < 100000; j++)
                {
                    string strflagvip_cardvip = m_conn.GetDataTableFirstValue(" SELECT COUNT(*) count  FROM dbo.vip_cardvip WITH(NOLOCK)  WHERE vipid ='" + vipid + "'", new string[] { }).ToString();
                    if (strflagvip_cardvip == "0")
                    {
                        break;
                    }
                    else
                    {
                        nNum++;
                        vipid = "NP" + hzyMessage.User_Name + "-" + DateTime.Now.ToString("yyyy-MM-dd") + "-" + nNum.ToString("0000");
                        continue;
                    }
                };
                pdt.Rows[0]["vipid"] = vipid;
                pdt.Columns.Add("crname");
                pdt.Rows[0]["crname"] = m_hzyMessage.User_Name;
                #endregion

                #region 插入vip_user表
                bool bResult = false;
                bResult = m_conn.Insert("[dbo].[vip_user]", pdt);

                #endregion

                #region 插入vip_cardvip表

                string strSQL1 = @"
                        INSERT INTO vip_cardvip(vipcardid,viptypeid,vipid,vipemit,vipemitadd,MaxDay,crdate,limitday,crname
	                              )
                             ( SELECT  @Param0 vipcardid, @Param6 viptypeid,@Param1 vipid,@Param2 vipemit,@Param3 vipemitadd,'1000' MaxDay,@Param4 crdate,'9999' limitday
                                       , @Param5 crname
                                    )";
                m_conn.ExcuteQuerryByTran(strSQL1, new object[] { strMaxvipcode, vipid, timeNow, strdepotid, timeNow, hzyMessage.User_Name_CN.Substring(9), strlevel1_type });
                #endregion
            }
            else
            {
                #region 更新vip_cardvip表审核状态

                //更新的时候也要验证手机号
                string strflagTEL = m_conn.GetDataTableFirstValue(@"
                        SELECT  A.*
                        FROM    dbo.vip_user a WITH ( NOLOCK )
                                INNER JOIN dbo.j_depot b WITH ( NOLOCK ) ON a.depotid = b.depotid
                                                                            AND b.unitid IN (
                                                                            SELECT  unitid
                                                                            FROM    dbo.j_depot WITH ( NOLOCK )
                                                                            WHERE   depotid = @Param0)
                        WHERE   A.mobtel = @Param1", new string[] { strdepotid, strmobtel }).ToString();

                if (strflagTEL == "1")
                {
                    throw new Exception("该手机号已经存在！");
                };
                ArrayList listKey = new ArrayList();
                listKey.Add("vipid");
                m_conn.Update("[dbo].[vip_user]", pdt, listKey);
                #endregion
            }
            m_conn.CommitTransaction();

            dt_EditResult.Rows.Add(new object[] { true, "成功" });
            ds_Return.Tables.Add(dt_EditResult);
        }
        #endregion

        #region GetReferee
        private void GetReferee()
        {
            string strSQL = @"SELECT TOP 10 [vipid],[vipcode],[vipname],[vipsex],[mobtel]
                              FROM [dbo].[vip_user]
                              WHERE vipname like '%" + filter + "%' or mobtel like '%" + filter + "%' or vipcode like '%"+filter+"%'";

            ds_Return = m_conn.GetDataSet(strSQL);
        }
        #endregion

        
        #endregion
    }
}