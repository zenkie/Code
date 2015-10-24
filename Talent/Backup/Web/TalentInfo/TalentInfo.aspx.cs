﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Drawing;
using System.Web.Services;

namespace Talent.Web.TalentInfo
{
    public partial class TalentInfo : System.Web.UI.Page
    {
        private static BLL.TB_RC_CompanyBasic cbdb = new BLL.TB_RC_CompanyBasic();
        private static BLL.TB_RC_TalentClass tcdb = new BLL.TB_RC_TalentClass();
        private static BLL.TB_RC_CompanyTalentClassRelate cbcrdb = new BLL.TB_RC_CompanyTalentClassRelate();
        private static BLL.TB_RC_TalentInfor tidb = new BLL.TB_RC_TalentInfor();
        private static BLL.TB_RC_TalentDocument tddb = new BLL.TB_RC_TalentDocument();

        protected Model.TB_RC_CompanyBasic model = null;
        protected string selectstr = "";
        protected string talentsper = "";
        protected void Page_Load(object sender, EventArgs e)
        {
          /*  int count = 0;
            if (!IsPostBack)
            {
                string CB_No = Common.Constants.getReqValue(Request, "CB_No");
                if (CB_No == "") model = new Model.TB_RC_CompanyBasic();
                else
                {
                    model = cbdb.GetModel(int.Parse(CB_No));
                    if (model != null)
                    {
                        var list = tcdb.GetModelListByRelate(CB_No);
                        foreach (var tc in list)
                        {
                            count++;
                            selectstr += GetTalentOption(tc.TC_No);
                        }
                        for (int i = count; i < 5; i++)
                        {
                            selectstr += GetTalentOption(-1);
                        }
                        talentsper = GetTalentsPer(model.CB_No);
                    }
                }
            } */
        }

        /*增加公司*/
        public static int AddLabelCompanyDialog(HttpRequest req, ref string message,ref int id)
        {
            string tmp = "";
            Model.TB_RC_CompanyBasic model = new Model.TB_RC_CompanyBasic();
            model.CB_X = Common.Constants.getReqValue(req, "CB_X");
            model.CB_Y = Common.Constants.getReqValue(req, "CB_Y");
            model.CB_Name = Common.Constants.getReqValue(req, "CB_Name");
            model.CB_Province = Common.Constants.getReqValue(req, "CB_Province");
            tmp = Common.Constants.getReqValue(req, "CB_Num");
            if (tmp != "") model.CB_Num = int.Parse(tmp);
            model.CB_Position = Common.Constants.getReqValue(req, "CB_Position");
            model.CB_SetUp =Common.Constants.getReqValue(req, "CB_SetUp");
            model.CB_Des = Common.Constants.getReqValue(req, "CB_Des");

            if (model.CB_X == "" || model.CB_Y == "")
            {
                message = "坐标为空，不能加入";
                return Common.Constants.ERR;
            }

            message = "增加公司成功";
            id = cbdb.Add(model);

            return Common.Constants.OK;
        }

        /*更新公司*/
        public static int UpdateTalentInfo(HttpRequest req, ref string message, ref int id)
        {
            string tmp = Common.Constants.getReqValue(req, "CB_No");
            if (tmp == "")
            {
                message = "获取id失败，请重新选择更新";
                return Common.Constants.ERR;
            }
            Model.TB_RC_CompanyBasic model = cbdb.GetModel(Convert.ToInt32(tmp));
            if (model == null )
            {
                message = "数据库不存在该记录，请刷新地图";
                return Common.Constants.ERR;
            }
            id = model.CB_No;

            var rel = Common.Constants.getReqValue(req,"rel");
            if (rel == "basicID") /*基本信息更新*/
            {
                return UpdateTalentInfoBasic(req, ref message);
            }
            else if (rel == "studyID")/*调研信息更新*/
            {
                return UpdateTalentInfoStudy(req, ref message);
            }
            else if (rel == "listID")/*人才库更新*/
            {
                var TI_Nostr = Common.Constants.getReqValue(req, "TI_No");
                var TI_Noarr = TI_Nostr.Split(',');
                if (TI_Nostr != "" && (TI_Noarr.Length > 0))
                {
                    var TI_BrandNamearr = Common.Constants.getReqValue(req, "TI_BrandName").Split(',');
                    var TI_TalentClassarr = Common.Constants.getReqValue(req, "TI_TalentClass").Split(',');
                    var TI_Namearr = Common.Constants.getReqValue(req, "TI_Name").Split(',');
                    var TI_Sexarr = Common.Constants.getReqValue(req, "TI_Sex").Split(',');
                    var TI_Phonearr = Common.Constants.getReqValue(req, "TI_Phone").Split(',');
                    var TI_Srcarr = Common.Constants.getReqValue(req, "TI_Src").Split(',');
                    var TI_RecommendPostarr = Common.Constants.getReqValue(req, "TI_RecommendPost").Split(',');
                    var TI_Markarr = Common.Constants.getReqValue(req, "TI_Mark").Split(',');
                    var TI_Auditionarr = Common.Constants.getReqValue(req, "TI_Audition").Split(',');
                    var TI_AuditionResultarr = Common.Constants.getReqValue(req, "TI_AuditionResult").Split(',');
                    var TI_FollowUpPeoplearr = Common.Constants.getReqValue(req, "TI_FollowUpPeople").Split(',');

                    var TI_Workarr = Common.Constants.getReqValue(req, "TI_Work").Split(',');
                    var TI_Industryarr = Common.Constants.getReqValue(req, "TI_Industry").Split(',');
                    var TI_Recommendarr = Common.Constants.getReqValue(req, "TI_Recommend").Split(',');
                    var TI_RecommendDatearr = Common.Constants.getReqValue(req, "TI_RecommendDate").Split(',');
            //        var TI_MaintainDatearr = Common.Constants.getReqValue(req, "TI_MaintainDate").Split(',');
             //       var TI_MaintainResultarr = Common.Constants.getReqValue(req, "TI_MaintainResult").Split(',');
                    for (int i = 0; i < TI_Noarr.Length; i++)
                    {
                        var ti = tidb.GetModel(Convert.ToInt32(TI_Noarr[i]));
                        if (ti != null)
                        {
                            ti.TI_BrandName = TI_BrandNamearr[i];
                            ti.TI_TalentClass = TI_TalentClassarr[i];
                            ti.TI_Name = TI_Namearr[i];
                            ti.TI_Sex = TI_Sexarr[i];
                            ti.TI_Phone = TI_Phonearr[i];
                            ti.TI_Src = TI_Srcarr[i];
                            ti.TI_RecommendPost = TI_RecommendPostarr[i];
                            ti.TI_Mark = TI_Markarr[i];
                            ti.TI_Audition = TI_Auditionarr[i];
                            ti.TI_AuditionResult = TI_AuditionResultarr[i];
                            ti.TI_FollowUpPeople = TI_FollowUpPeoplearr[i];
                            ti.TI_Work = TI_Workarr[i];
                            ti.TI_Industry = TI_Industryarr[i];
                            ti.TI_Recommend = TI_Recommendarr[i];
                            DateTime? tmpdate = null;
                            if (TI_RecommendDatearr[i].Length == 10)
                            {
                                tmpdate = Convert.ToDateTime(TI_RecommendDatearr[i]);
                            }
                            ti.TI_RecommendDate = tmpdate;
                            /*DateTime? tmpdate = null;
                            if (TI_MaintainDatearr[i].Length == 10)
                            {
                                tmpdate = Convert.ToDateTime(TI_MaintainDatearr[i]);
                            }
                            ti.TI_MaintainDate = tmpdate;
                            ti.TI_MaintainResult = TI_MaintainResultarr[i]; */
                            tidb.Update(ti);
                        }
                    }
                }
                message = "人才库更新成功";
                return Common.Constants.OK;
            }
            else
            {
                message = "没有类型";
                return Common.Constants.ERR;
            }
        }

        /*删除公司*/
        public static int DelTalentInfo(HttpRequest req, ref string message)
        {
            string tmp = Common.Constants.getReqValue(req, "CB_No");
            if (tmp == "")
            {
                message = "公司编号未获取到";
                return Common.Constants.ERR;
            }
            var iT = Convert.ToInt32(tmp);
            cbdb.Delete(iT);
            cbcrdb.Delete(iT);
            tidb.DeleteByCB_NO(iT);
            tddb.DeleteByCB_NO(iT);
            message = "删除公司成功";
            return Common.Constants.OK;
        }

        public static int UpdateTalentInfoBasic(HttpRequest req, ref string message)
        {
            string tmp = Common.Constants.getReqValue(req, "CB_No");
            Model.TB_RC_CompanyBasic model = cbdb.GetModel(Convert.ToInt32(tmp));
            if (req.Files[0].ContentLength != 0)
            {
                System.Drawing.Image image = null;
                System.Drawing.Image hb = null;
                System.Drawing.Graphics g = null;
                try
                {
                    var tmpext = Common.Constants.GetFileExt(req.Files[0].FileName);
                    //req.Files[0].SaveAs(req.MapPath("../newImages") + "\\" + tparfs.TP_TeamImag);
                    string filedir = req.MapPath("newImages") + "\\";
                    string filename = tmp + "." + tmpext;
                    req.Files[0].SaveAs(filedir + filename);
                    image = System.Drawing.Image.FromFile(filedir + filename, false);
                    //System.Drawing.Image newimage = image.GetThumbnailImage(700, 400, null, new IntPtr());
                    double dVal = image.Width / 139.00;
                    hb = new System.Drawing.Bitmap(139, (int)(image.Height / dVal));//创建图片对象
                    g = System.Drawing.Graphics.FromImage(hb);//创建画板并加载空白图像
                    g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;//设置保真模式为高度保真
                    g.DrawImage(image, new Rectangle(0, 0, 139, (int)(image.Height / dVal)), 0, 0, image.Width, image.Height, GraphicsUnit.Pixel);//开始画图
                    model.CB_Img = "sl." + filename;
                    hb.Save(filedir + "\\" + model.CB_Img);
                }
                finally
                {
                    image.Dispose();
                    g.Dispose();
                    hb.Dispose();
                }
            }

            model.CB_Name = Common.Constants.getReqValue(req, "CB_Name");
            model.CB_Position = Common.Constants.getReqValue(req, "CB_Position");
            tmp = Common.Constants.getReqValue(req, "CB_Num");
            if (tmp != "") model.CB_Num = int.Parse(tmp);
            model.CB_Province = Common.Constants.getReqValue(req, "CB_Province");

            model.CB_SetUp = Common.Constants.getReqValue(req, "CB_SetUp");
            model.CB_Des = Common.Constants.getReqValue(req, "CB_Des");

            model.CB_Je = Common.Constants.getReqValue(req, "CB_Je");
            model.CB_Scale = Common.Constants.getReqValue(req, "CB_Scale");
            model.CB_BrandName = Common.Constants.getReqValue(req, "CB_BrandName");

            model.CB_BrandStyle = Common.Constants.getReqValue(req, "CB_BrandStyle");
            model.CB_PriceSection = Common.Constants.getReqValue(req, "CB_PriceSection");
            model.CB_Category = Common.Constants.getReqValue(req, "CB_Category");
            model.CB_ModeOperation = Common.Constants.getReqValue(req, "CB_ModeOperation");

            tmp = Common.Constants.getReqValue(req, "CB_ShopNum");
            if (tmp != "") model.CB_ShopNum = int.Parse(tmp);

            cbcrdb.Delete(model.CB_No);//删除原有的记录
            var arrstr = Common.Constants.getReqValue(req, "TC_No");
            string[] arr;
            if (arrstr != "")
            {
                arr = arrstr.Split(',');
                foreach (var cr in arr)
                {
                    if (cr.Trim() != "")
                    {
                        var tmpModel = new Model.TB_RC_CompanyTalentClassRelate() { CT_CB_No = model.CB_No, CT_TC_No = Convert.ToInt32(cr) };
                        if (!cbcrdb.Exists(tmpModel))
                        {
                            cbcrdb.Add(tmpModel);
                        }
                    }
                }
            }

            cbdb.Update(model);

            message = "更新公司成功";
            return Common.Constants.OK;
        }

        public static int UpdateTalentInfoStudy(HttpRequest req, ref string message)
        {

            Model.TB_RC_CompanyBasic model = cbdb.GetModel(Convert.ToInt32(Common.Constants.getReqValue(req, "CB_No")));
            model.CB_Founder = Common.Constants.getReqValue(req, "CB_Founder");
            model.CB_Advantage = Common.Constants.getReqValue(req, "CB_Advantage");
            model.CB_OrgStructure = Common.Constants.getReqValue(req, "CB_OrgStructure");
            model.CB_HumanSrc = Common.Constants.getReqValue(req, "CB_HumanSrc");
            cbdb.Update(model);
            message = "更新公司成功";
            return Common.Constants.OK;
        }


    /*    protected string GetTalentOption(int no)
        {
            var arr = tcdb.GetModelList("");
            StringBuilder sb = new StringBuilder();
            sb.Append("<select  style=' margin:2px' name='TC_No' >");
            sb.Append("<option></option>");
            foreach(var td in arr)
            {
                if (td.TC_No == no)
                {
                    sb.Append("<option selected=selected value='" + td.TC_No + "'>" + td.TC_Class + "</option>");
                }
                else
                {
                    sb.Append("<option value='" + td.TC_No + "'>" + td.TC_Class + "</option>");
                }
            }
            sb.Append("</select>");
            return sb.ToString();
        }

        protected string GetTalentsPer(int CB_NO)
        {
            StringBuilder sb = new StringBuilder();
            var list = tidb.GetModelList(" TI_CB_No='" + CB_NO + "' ");
            foreach( var obj in list )
            {
                sb.Append("<tr target='sid_talent' rel='" + obj.TI_No + "'><td>");
                sb.Append(obj.TI_No + "<input name='TI_No' type='hidden' value='" + obj.TI_No + "' size='15' />");   
                sb.Append("</td><td>");
                sb.Append("<input name='TI_BrandName' class='textInput lgray'  value='" + obj.TI_BrandName + "' size='30' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_TalentClass' class='textInput lgray' value='" + obj.TI_TalentClass + "' size='25' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_Name' class='textInput lgray' value='" + obj.TI_Name + "' size='25' />");
                sb.Append("</td><td>");
                sb.Append("<select name='TI_Sex'  class='textInput'><option></option><option value='男' " + (obj.TI_Sex == "男" ? "selected=selected" : "") + " >男</option><option value='女' " + (obj.TI_Sex == "女" ? "selected=selected" : "") + " >女</option></select>");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_Phone' class='textInput lgray' size='15' value='" + obj.TI_Phone + "' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_Src' class='textInput lgray' size='15' value='" + obj.TI_Src + "' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_RecommendPost' class='textInput lgray' size='15' value='" + obj.TI_RecommendPost + "' />");
                sb.Append("</td><td>");
                sb.Append("<select name='TI_Audition'  class='textInput'><option></option><option value='是' " + (obj.TI_Audition == "是" ? "selected=selected" : "") + ">是</option><option value='否' " + (obj.TI_Audition == "否" ? "selected=selected" : "") + " >否</option></select>");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_AuditionResult' class='textInput lgray' size='15'  value='" + obj.TI_AuditionResult + "' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_FollowUpPeople' class='textInput lgray'  size='15' value='" + obj.TI_FollowUpPeople + "' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_MaintainDate' class='date textInput lgray'  size='15' value='" + (obj.TI_MaintainDate == null ? "" : obj.TI_MaintainDate.Value.ToString("yyyy-MM-dd")) + "' />");
                sb.Append("</td><td>");
                sb.Append("<input name='TI_MaintainResult' class='textInput lgray'  size='20'  value='" + obj.TI_MaintainResult + "' />");
                sb.Append("</td><td>");
                sb.Append("<a href='TalentInfo/TalentDocument.aspx?CB_No=" + CB_NO + "&TI_No=" + obj.TI_No + "' target='dialog' mask=true  rel='ducument_dia' title='' width='400' height='500'>简历管理</a>");
                sb.Append("</td></tr>");      
            }
            
            return sb.ToString();
        }

        */

        [WebMethod]
        public static string AddTalent(int CB_NO)
        {
            Model.TB_RC_TalentInfor talent = new Model.TB_RC_TalentInfor();
            talent.TI_CB_No = CB_NO;
            talent.TI_CreateDate = DateTime.Now;
            StringBuilder sb = new StringBuilder();
            int i = tidb.Add(talent);
            sb.Append("<tr target='sid_talent' rel='"+i+"'><td>");
            sb.Append(i+"<input name='TI_No' type='hidden' value='" + i + "' size='15' />");   
            sb.Append("</td><td>");
            sb.Append("<input name='TI_BrandName' class='textInput lgray' size='30' />");                          
            sb.Append("</td><td>");
            sb.Append("<input name='TI_TalentClass' class='textInput lgray' size='25' />");
            sb.Append("</td><td>");
            sb.Append("<input name='TI_Name' class='textInput lgray' size='25' />");  
            sb.Append("</td><td>");
            sb.Append("<select name='TI_Sex'  class='textInput'><option></option><option value='男'>男</option><option value='女'>女</option></select>");
            sb.Append("</td><td>");
            sb.Append("<input name='TI_Phone' class='textInput lgray' size='15' />");  
            sb.Append("</td><td>");
            sb.Append("<input name='TI_Src' class='textInput lgray' size='15' />");  
            sb.Append("</td><td>");
            sb.Append("<input name='TI_RecommendPost' class='textInput lgray' size='15' />");  
            sb.Append("</td><td>");
            sb.Append("<input name='TI_Mark' class='textInput lgray' size='15' />");
            sb.Append("</td><td>");
            sb.Append("<select name='TI_Audition'  class='textInput'><option></option><option value='是'>是</option><option value='否'>否</option></select>");
            sb.Append("</td><td>");
            sb.Append("<input name='TI_AuditionResult' class='textInput lgray' size='15' />");  
            sb.Append("</td><td>");
            sb.Append("<input name='TI_FollowUpPeople' class='textInput lgray'  size='15' />");  
            sb.Append("</td><td>");
            sb.Append("<input name='TI_MaintainDate' class='date textInput lgray'  size='15' />");  
            sb.Append("</td><td>");
            sb.Append("<input name='TI_MaintainResult' class='textInput lgray'  size='20' />");  
            sb.Append("</td><td>");
            sb.Append("<a href='TalentInfo/TalentDocument.aspx?CB_No=" + CB_NO + "&TI_No="+ i +"' target='dialog' mask=true  rel='ducument_dia' title='' width='400' height='500'>简历管理</a>");
            sb.Append("</td></tr>");                                 
            return "{\"flag\":\"true\",\"html\":\""   +   sb.ToString()   +    "\"}";
        }

        [WebMethod]
        public static string DelTalent(int id)
        {
            tidb.Delete(id);
            return "{\"flag\":\"true\",\"html\":\"删除成功\"}";
        }
    }
}