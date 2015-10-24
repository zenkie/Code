﻿<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Data;
using System.Web;
using System.Web.SessionState;
using System.Collections;
using System.Diagnostics;
using System.Xml;
using HZY.COM.WEB;

public class Handler : IHttpHandler, IRequiresSessionState
{

    //private string m_WSID = "";
    //private string m_SessionID = "";
    //private string m_RequestType = "";
    //private string m_App = "HZY_WSRR";
    //private string m_LoginApp = "SSO";
    string zt = "";

    private HandlerCfg m_HzyCfg;


    public void ProcessRequest(HttpContext context)
    {
        //免登录设置，发布时需要删除
        //context.Session["SessionID" + m_HzyCfg.m_App] = "470560db-b3e0-4a77-840a-0f909c5c6752"; //测试库
        //context.Session["UserName" + m_HzyCfg.m_App] = "luoyanling";
        //context.Session["SessionID"] = "acb11d63-88a8-4e69-9dd9-055209df69f1";//正式库
        //context.Session["SessionID"] = null; //测试库

        //不让浏览器缓存
        context.Response.Buffer = true;
        context.Response.ExpiresAbsolute = DateTime.Now.AddDays(-1);
        context.Response.AddHeader("pragma", "no-cache");
        context.Response.AddHeader("cache-control", "");
        context.Response.CacheControl = "no-cache";
        context.Response.ContentType = "text/plain";

        //try
        //{
        if (context.Request.Form.AllKeys.Length != 0)
        {
            if (context.Request["zt"] != null)
            {
                zt = context.Request["zt"];


                context.Session["zt" + "_PLMFZ"] = zt;
            }
        }
        if (context.Session["zt" + "_PLMFZ"] == null
                     || context.Session["zt" + "_PLMFZ"].ToString() == "")
        {
            //报错
        }
        else
        {
            zt = context.Session["zt" + "_PLMFZ"].ToString();
        }

        //}

        //catch
        //{
        //    throw;
        //}

        m_HzyCfg = new HandlerCfg(zt + "_PLMFZ", zt + "_PLMFZ");
        CallByJSON(context);
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

    #region "CallByJSON"
    public void CallByJSON(HttpContext context)
    {

        try
        {
            bool bExcelImport = false;
            DataSet dsExcel = null;
            if (context.Request.Files.Count > 0)
            {
                UploadFile clsUp = new UploadFile(context);
                clsUp.Upload();
                dsExcel = clsUp.dsExcelData;

                if (context.Request["ExcelImport"] != null && context.Request["ExcelImport"].ToString().ToUpper() == "true".ToUpper())
                {
                    bExcelImport = true;
                }
            }
            if (context.Request["WSID"].ToString() == "LoginName")
            {
                if (context.Session["UserName" + m_HzyCfg.m_App] == null)
                {
                    context.Session["UserName" + m_HzyCfg.m_App] = "";
                }

                if (context.Session["PassWord" + m_HzyCfg.m_App] == null)
                {
                    context.Session["PassWord" + m_HzyCfg.m_App] = "";
                }

                string str = "{\"UserName\":\"" + context.Session["UserName" + m_HzyCfg.m_App].ToString() + "\",\"PassWord\":\"" + context.Session["PassWord" + m_HzyCfg.m_App].ToString() + "\"}";
                context.Response.Write(str);
            }
            else if (context.Request["WSID"].ToString() == "m_UserNameC")
            {
                if (context.Session["m_UserNameC" + m_HzyCfg.m_App] == null)
                {
                    context.Session["m_UserNameC" + m_HzyCfg.m_App] = "";
                }
                context.Response.Write("{\"m_UserNameC\":\"" + context.Session["m_UserNameC" + m_HzyCfg.m_App].ToString() + "\"}");
            }
            else
            {
                DataSet dsRequest = WebHandler.GetRequestData(context, m_HzyCfg);

                if (m_HzyCfg.m_WSID.ToUpper() == "3495b554-04fb-42dd-a7b8-1e9ab7153a0b".ToUpper())
                {
                    DataRow dr = dsRequest.Tables[0].NewRow();
                    dr["ParamName"] = "username";
                    dr["ParamValue"] = context.Session["UserName" + m_HzyCfg.m_App].ToString();
                    dsRequest.Tables[0].Rows.Add(dr);

                    dr = dsRequest.Tables[0].NewRow();
                    dr["ParamName"] = "pwd";
                    dr["ParamValue"] = context.Session["PassWord" + m_HzyCfg.m_App].ToString();
                    dsRequest.Tables[0].Rows.Add(dr);

                }

                string strXML = WebHandler.GetXMLFromDS(dsRequest, m_HzyCfg);

                WSRR.WSRR wsrr = new WSRR.WSRR();
                wsrr.Timeout = 1000 * 60 * 60; //超时时间：60分钟
                string strResult = "";
                if (bExcelImport)
                {
                    strResult = wsrr.CallByXMLContainBigData(strXML, dsExcel);//F11进后台
                }
                else
                {
                    strXML = strXML.Replace("<>", "").Replace("</>", "");
                    strXML = HttpUtility.UrlDecode(strXML);
                    //strXML = strXML.Replace("%3C", "<").Replace("%3E", ">");
                    strResult = wsrr.CallByXML(strXML);//F11进后台8
                    strResult = strResult.Replace("&", "&amp;");
                }

                //登录接口
                if ((m_HzyCfg.m_WSID.ToUpper() == "550fc164-adc8-4f88-bc9d-73c4248050bc".ToUpper()
                    || m_HzyCfg.m_WSID.ToUpper() == "08d42db4-d2b3-4999-a3ea-8b4be8f2333e".ToUpper()
                    ) && !strResult.StartsWith("Error"))
                {
                    context.Session["PassWord" + m_HzyCfg.m_App] = context.Request["PassWord"];

                    context.Session["m_UserNameC" + m_HzyCfg.m_App] = null;
                    //根据SessionID获取用户信息

                    string strXML1 = @"
                                                    <Interface WSID=""03b960ad-e6f2-4378-b060-5f7f29059e24""  App=""" + m_HzyCfg.m_App + @""" 
                                                    SessionID=""" + strResult + @""">
                                                    <SessionID>" + strResult + @"</SessionID>
                                                    </Interface>";
                    string strResultUserInfo = "";
                    strResultUserInfo = wsrr.CallByXML(strXML1);
                    DataSet dsUserInfo = HZY.COM.Common.Common.GetDSByExcelXML(strResultUserInfo, false);
                    if (dsUserInfo.Tables.Count > 0 && dsUserInfo.Tables[0].Rows.Count > 0)
                    {
                        string strUserName_CN = dsUserInfo.Tables[0].Rows[0]["App_UserName_CN"].ToString();
                        context.Session["m_UserNameC" + m_HzyCfg.m_App] = strUserName_CN;
                    }

                }

                if (m_HzyCfg.m_WSID.ToUpper() == "3495b554-04fb-42dd-a7b8-1e9ab7153a0b".ToUpper())
                {
                    context.Response.Write(strResult.Trim());
                }
                else if (strResult.ToUpper().StartsWith("<ROOT><RESULT>"))
                {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(strResult);
                    XmlNode xml = xmlDoc.DocumentElement;
                    string strState = xml.FirstChild.FirstChild.InnerText;
                    string strMessage = xml.FirstChild.LastChild.InnerText;
                    if (strState == "9")
                    {
                        context.Response.Write("{\"Error\":\"" + strMessage + "\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"Result\":\"" + strMessage + "\"}");
                    }
                }
                else if (strResult.ToUpper().StartsWith("<ROOT><STATE>"))
                {
                    XmlDocument xmlDoc = new XmlDocument();
                    xmlDoc.LoadXml(strResult);
                    XmlNode xml = xmlDoc.DocumentElement;
                    string strState = xml.FirstChild.InnerText;
                    string strMessage = xml.LastChild.InnerText;
                    if (strState == "9")
                    {
                        context.Response.Write("{\"Error\":\"" + strMessage + "\"}");
                    }
                    else
                    {
                        context.Response.Write("{\"Result\":\"" + strMessage + "\"}");
                    }


                }
                else
                {
                        context.Response.Write(WebHandler.GetJSONFromXML(strResult, context, m_HzyCfg));
                }
            }
        }
        catch (Exception ex)
        {
            string strMessage = ex.Message;
            if (ex.Message == "")
            {
                strMessage = ex.ToString().Replace("\"", "").Replace("'", "");
            }
            if (strMessage == "")
            {
                strMessage = "未知错误";
            }
            context.Response.Write("{\"Error\":\"" + ex.ToString().Replace("\"", "").Replace("'", "") + "\"}");

        }
        finally
        {
            context.Response.End();
        }

    }
    #endregion


}