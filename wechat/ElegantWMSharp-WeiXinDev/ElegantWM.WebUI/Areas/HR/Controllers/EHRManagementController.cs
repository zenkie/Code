﻿using ElegantWM.Common;
using ElegantWM.EntityModel;
using ElegantWM.Factory;
using ElegantWM.Tools;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ElegantWM.DTO;
using System.Text.RegularExpressions;

namespace ElegantWM.WebUI.Areas.HR.Controllers
{
    public class EHRManagementController : Controller
    {
        #region 基础信息,登入验证,cookie,公告,审批人员获取

        [Page]
        [Description("EHR登入主页")]
        public ActionResult Index()
        {
            return View();
        }

        [Action]
        [Description("CheckLogin")]
        [HttpPost]
        [Open]
        public JsonResult CheckLogin(string UserName, string password, string passwordno, string checkboxrem)
        {
            DataTable dtpCentum = WMFactory.Wsrr.CheckLogin(UserName, password);

            if (dtpCentum.Rows[0]["c_oid"].ToString() != "")
            {
                string c_oid = dtpCentum.Rows[0]["c_oid"].ToString();
                string c_oid_user = dtpCentum.Rows[0]["c_oid_user"].ToString();
                string sfz = dtpCentum.Rows[0]["c_idcard"].ToString();
                string UserNameC = dtpCentum.Rows[0]["c_name"].ToString();
                string c_password = dtpCentum.Rows[0]["c_password"].ToString();
                string c_jobname = dtpCentum.Rows[0]["c_jobname"].ToString();//新增
                string c_unitname = dtpCentum.Rows[0]["c_unitname"].ToString();//新增
                string c_code = dtpCentum.Rows[0]["c_code"].ToString();//新增
                string browser = "iphone";
                //string jsonStr = JsonHelper.ToJson(dtpCentum);
                //存入一些相应需要的cookie
                if (checkboxrem == "1")
                {
                    CookieHelper.SaveCookie("c_oid", c_oid, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("UserName", UserName, 60 * 24 * 30 * 10);//员工号
                    CookieHelper.SaveCookie("c_oid_user", c_oid_user, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("sfz", sfz, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("UserNameC", UserNameC, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("browser", browser, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("c_password", c_password, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("passwordno", passwordno, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("c_jobname", c_jobname, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("c_unitname", c_unitname, 60 * 24 * 30 * 10);
                    CookieHelper.SaveCookie("c_code", c_code, 60 * 24 * 30 * 10);

                }
                else
                {
                    CookieHelper.SaveCookie("c_oid", c_oid, 0);
                    CookieHelper.SaveCookie("UserName", UserName, 0);//员工号
                    CookieHelper.SaveCookie("c_oid_user", c_oid_user, 0);
                    CookieHelper.SaveCookie("sfz", sfz, 0);
                    CookieHelper.SaveCookie("UserNameC", UserNameC, 0);
                    CookieHelper.SaveCookie("browser", browser, 0);
                    CookieHelper.SaveCookie("c_password", c_password, 0);
                    CookieHelper.SaveCookie("passwordno", passwordno, 0);
                    CookieHelper.SaveCookie("c_jobname", c_jobname, 0);
                    CookieHelper.SaveCookie("c_unitname", c_unitname, 0);
                    CookieHelper.SaveCookie("c_code", c_code, 0);
                }
                //return Json(ResultMsg.Success(jsonStr));
                return Json(ResultMsg.Success(sfz));

            }
            else
            {
                return Json(ResultMsg.Failure("账号密码错误"));
            }
        }

        [Page]
        [Description("HR公告信息")]
        public ActionResult Main()
        {
            ViewBag.NoticInfo = WMFactory.Wsrr.GetNotic();
            return View();
        }

        [Action]
        [Description("退出登录")]
        [HttpPost]
        public JsonResult LogOut()
        {
            CookieHelper.ClearCookie("c_oid");
            CookieHelper.ClearCookie("c_oid_user");
            CookieHelper.ClearCookie("sfz");
            CookieHelper.ClearCookie("UserNameC");
            CookieHelper.ClearCookie("browser");
            CookieHelper.ClearCookie("c_password");
            return Json(ResultMsg.Success("退出成功！"));
        }

        [Page]
        [Description("HR薪资身份证验证")]
        public ActionResult PayInfoCheack()
        {
            return View();
        }


        [Action]
        [Description("薪资身份证验证")]
        [HttpPost]
        public JsonResult PayInfoCheck(string sfz)
        {
            string strCookiesfz = CookieHelper.GetCookie("sfz");
            if (sfz.ToUpper() != strCookiesfz.Substring(14, 4).ToUpper())
            {
                return Json(ResultMsg.Failure("验证失败.请确认身份证后4位！"));
            }
            else
            {
                return Json(ResultMsg.Success("验证成功！"));
            }
        }


        [Page]
        [Description("考勤")]
        public ActionResult AvInfo()
        {
            return View();
        }

        [Action]
        [Description("审批人员")]
        [HttpPost]
        [Open]
        public JsonResult ApplyInfo()
        {
            string c_oid = CookieHelper.GetCookie("c_oid");
            string sfz = CookieHelper.GetCookie("sfz");
            DataTable ApplyInfo = WMFactory.Wsrr.ApplyInfo(c_oid, sfz);
            string jsonStr = JsonHelper.ToJson(ApplyInfo);
            return Json(ResultMsg.Success(jsonStr));
        }

        [Page]
        [Description("报错")]
        public ActionResult Warring()
        {
            return View();
        }
        [Page]
        [Description("notic")]
        public ActionResult noticinfo(string imagepath)
        {
            ViewBag.imagepath = imagepath;
            return View();
        }

        #endregion

        #region 工资信息

        [Page]
        [Description("HR工资信息")]
        public ActionResult PayInfo(string year, string month)
        {
            string c_idcard = CookieHelper.GetCookie("sfz");
            string c_password = CookieHelper.GetCookie("c_password");
            ViewBag.PayInfo = WMFactory.Wsrr.GetEHRForSalary(c_password, c_idcard, year, month);//通过年月获取数据,第一次默认空年空月,后台自动获取该身份证号最新的一个月数据
            return View();
        }

        [Action]
        [Description("HR工资信息选择")]
        public PartialViewResult PayInfoSalary(string year, string month)
        {
            string c_idcard = CookieHelper.GetCookie("sfz");
            string c_password = CookieHelper.GetCookie("c_password");
            ViewBag.PayInfo = WMFactory.Wsrr.GetEHRForSalary(c_password, c_idcard, year, month);//通过年月获取数据.
            return PartialView();
        }
        #endregion

        #region 出勤

        [Page]
        [Description("打卡记录查询")]
        public ActionResult AttendanceGet(string year, string month)
        {
            if (year == null || month == null)
            {
                year = DateTime.Now.Year.ToString();
                month = DateTime.Now.Month.ToString();
            }
            string c_idcard = CookieHelper.GetCookie("sfz");
            ViewBag.AttendanceGet = WMFactory.Wsrr.AttendanceGet(c_idcard, year, month);
            return View();
        }

        [Action]
        [Description("打卡记录查询选择")]
        public PartialViewResult AttendanceGetInfo(string year, string month)
        {
            if (year == null || month == null)
            {
                year = DateTime.Now.Year.ToString();
                month = DateTime.Now.Month.ToString();
            }
            string c_idcard = CookieHelper.GetCookie("sfz");
            ViewBag.AttendanceGet = WMFactory.Wsrr.AttendanceGet(c_idcard, year, month);
            return PartialView();
        }

        [Page]
        [Description("补签考勤查询")]
        public ActionResult AttendanceGetApply(string year, string month)
        {
            return View();
        }

        [Action]
        [Description("补签考勤查询选择")]
        public PartialViewResult AttendanceGetApplyInfo(string year, string month)
        {
            if (year == null || month == null)
            {
                year = DateTime.Now.Year.ToString();
                month = DateTime.Now.Month.ToString();
            }
            string c_idcard = CookieHelper.GetCookie("sfz");
            ViewBag.AttendanceGetApply = WMFactory.Wsrr.AttendanceGetApply(c_idcard, year, month);
            return PartialView();
        }

        [Page]
        [Description("补签考勤申请")]
        public ActionResult AttendanceApply()
        {
            string c_oid = CookieHelper.GetCookie("c_oid");
            string sfz = CookieHelper.GetCookie("sfz");
            ViewBag.ApplyInfo = WMFactory.Wsrr.ApplyInfo(c_oid, sfz);
            return View();
        }

        [Action]
        [Description("考勤申请提交")]
        [HttpPost]
        [Open]
        public JsonResult AttendanceSubmit(string adddate, string adddate1, string adddate2, string addcause, string addchangeap1,
                                        string addchangeap2, string addremarks, string c_oid)
        {
            string name = CookieHelper.GetCookie("UserNameC");
            string AttendanceSubmitc_oid = CookieHelper.GetCookie("c_oid");

            DataTable dtpResult = WMFactory.Wsrr.AttendanceSubmit(name, adddate, adddate1, adddate2, addcause, addchangeap1, addchangeap2, addremarks, AttendanceSubmitc_oid);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }

        [Page]
        [Description("审批考勤数据加载")]
        public ActionResult AttendanceGetApprove()
        {
            string c_oid = CookieHelper.GetCookie("c_oid");
            //c_oid = "81505586";
            ViewBag.AttendanceGetApprove = WMFactory.Wsrr.AttendanceGetApprove(c_oid);
            return View();
        }


        [Action]
        [Description("考勤申请提交")]
        [HttpPost]
        [Open]
        public JsonResult AttendanceApproveSubmit(string strtype, string c_approveflowid, string c_oid_renewcardsign, string c_remark, string c_renewremark)
        {


            string AttendanceApproveSubmitc_oid = CookieHelper.GetCookie("c_oid");//员工号81505586
            //AttendanceApproveSubmitc_oid = "81505586";
            string AttendanceApproveSubmitc_oid_user = CookieHelper.GetCookie("c_oid_user");//员工编号(操作员)

            DataTable dtpResult = WMFactory.Wsrr.AttendanceApproveSubmit(strtype, AttendanceApproveSubmitc_oid, AttendanceApproveSubmitc_oid_user,
                c_approveflowid, c_oid_renewcardsign, c_remark, c_renewremark);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }

        #endregion

        #region 加班

        [Page]
        [Description("加班查询")]
        public ActionResult OverTimeGet()
        {
            return View();
        }

        [Action]
        [Description("加班查询选择")]
        public PartialViewResult OverTimeGetInfo(string year, string month)
        {
            if (year == null || month == null)
            {
                year = DateTime.Now.Year.ToString();
                month = DateTime.Now.Month.ToString();
            }
            string c_oid = CookieHelper.GetCookie("c_oid");
            ViewBag.OverTimeGet = WMFactory.Wsrr.OverTimeGet(c_oid, year, month);
            return PartialView();
        }

        [Page]
        [Description("加班申请")]
        public ActionResult OverTimeApply()
        {
            //string c_oid = CookieHelper.GetCookie("c_oid");
            //string sfz = CookieHelper.GetCookie("sfz");
            //ViewBag.ApplyInfo = WMFactory.Wsrr.ApplyInfo(c_oid, sfz);
            return View();
        }

        [Action]
        [Description("加班申请提交")]
        [HttpPost]
        [Open]
        public JsonResult OverTimeApplySubmit(string sp1, string sp2, string c_remark, string begindate, string enddate, string c_value,
                                        string c_reason, string c_attitemid)
        {
            string OverTimeApplySubmitc_oid = CookieHelper.GetCookie("c_oid");

            DataTable dtpResult = WMFactory.Wsrr.OverTimeApplySubmit(OverTimeApplySubmitc_oid, sp1,  sp2,c_remark, begindate, enddate, c_value, c_reason, c_attitemid);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }


        [Page]
        [Description("审批加班数据加载")]
        public ActionResult OverTimeGetApprove()
        {
            string c_oid = CookieHelper.GetCookie("c_oid");
            //c_oid = "81505586";
            ViewBag.OverTimeGetApprove = WMFactory.Wsrr.OverTimeGetApprove(c_oid);
            return View();
        }
        [Action]
        [Description("审批加班提交")]
        [HttpPost]
        [Open]
        public JsonResult OverTimeApproveSubmit(string c_oid_overtimeapply, string applec_oid, string c_renewremark, string c_approveflowid, string c_remark, string strtype)
        {
            string OverTimeApproveSubmitc_oid = CookieHelper.GetCookie("c_oid");//员工号81505586
            //OverTimeApproveSubmitc_oid = "81505586";
            string OverTimeApproveSubmitc_oid_user = CookieHelper.GetCookie("c_oid_user");//员工编号(操作员)

            DataTable dtpResult = WMFactory.Wsrr.OverTimeApproveSubmit(c_oid_overtimeapply, applec_oid, c_renewremark, c_approveflowid,
                                                OverTimeApproveSubmitc_oid, OverTimeApproveSubmitc_oid_user, c_remark, strtype);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }

        #endregion

        #region 休假信息

        [Page]
        [Description("休假查询")]
        public ActionResult VacationGet()
        {
            return View();
        }

        [Action]
        [Description("休假查询选择")]
        public PartialViewResult VacationGetInfo(string year, string month)
        {
            if (year == null || month == null)
            {
                year = DateTime.Now.Year.ToString();
                month = DateTime.Now.Month.ToString();
            }
            string c_oid = CookieHelper.GetCookie("c_oid");
            ViewBag.VacationGet = WMFactory.Wsrr.VacationGet(c_oid, year, month);
            return PartialView();
        }

        [Page]
        [Description("休假申请")]
        public ActionResult VacationApply()
        {
            //string c_oid = CookieHelper.GetCookie("c_oid");
            //string sfz = CookieHelper.GetCookie("sfz");
            //ViewBag.ApplyInfo = WMFactory.Wsrr.ApplyInfo(c_oid, sfz);
            return View();
        }


        [Action]
        [Description("验证该时间段里面是否存在休假")]
        [HttpPost]
        [Open]
        public JsonResult CheckVacation(string c_begintime, string c_endtime)
        {
            string CheckVacationApplySubmitc_oid = CookieHelper.GetCookie("c_oid");

            DataTable dtpResult = WMFactory.Wsrr.CheckVacation(CheckVacationApplySubmitc_oid, c_begintime, c_endtime);


            string jsonStr = JsonHelper.ToJson(dtpResult);
            return Json(ResultMsg.Success(jsonStr));
        }



        [Action]
        [Description("休假申请提交")]
        [HttpPost]
        [Open]
        public JsonResult VacationApplySubmit(string sp1, string sp2, string c_attitemoid, string c_year, string begindate, string enddate,
                                        string c_value, string c_reason, string c_principal, string c_linkman, string c_remark)
        {
            string VacationApplySubmitc_oid = CookieHelper.GetCookie("c_oid");

            DataTable dtpResult = WMFactory.Wsrr.VacationApplySubmit(VacationApplySubmitc_oid, sp1,  sp2, c_attitemoid, c_year, begindate, enddate, c_value, c_reason, c_principal, c_linkman, c_remark);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }


        [Page]
        [Description("审批休假数据加载")]
        public ActionResult VacationGetApprove()
        {
            string c_oid = CookieHelper.GetCookie("c_oid");
            //c_oid = "81505586";
            ViewBag.VacationGetApprove = WMFactory.Wsrr.VacationGetApprove(c_oid);
            return View();
        }

        [Action]
        [Description("审批休假提交")]
        [HttpPost]
        [Open]
        public JsonResult VacationApproveSubmit(string c_remark, string c_approveflowid, string c_oid_vocationapply, string vacationtype)
        {
            string VacationApproveSubmitc_oid = CookieHelper.GetCookie("c_oid");//员工号81505586
            //VacationApproveSubmitc_oid = "81505586";
            string VacationApproveSubmitc_oid_user = CookieHelper.GetCookie("c_oid_user");//员工编号(操作员)

            DataTable dtpResult = WMFactory.Wsrr.VacationApproveSubmit(VacationApproveSubmitc_oid, c_remark, VacationApproveSubmitc_oid_user, c_approveflowid,
                                                c_oid_vocationapply, vacationtype);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }

        #endregion

        #region 公出信息

        [Page]
        [Description("出差查询")]
        public ActionResult OutGet()
        {
            return View();
        }

        [Action]
        [Description("出差查询选择")]
        public PartialViewResult OutGetInfo(string year, string month)
        {
            if (year == null || month == null)
            {
                year = DateTime.Now.Year.ToString();
                month = DateTime.Now.Month.ToString();
            }
            string c_oid = CookieHelper.GetCookie("c_oid");
            ViewBag.OutGet = WMFactory.Wsrr.OutGet(c_oid, year, month);
            return PartialView();
        }

        [Page]
        [Description("出差申请")]
        public ActionResult OutApply()
        {
            return View();
        }

        [Action]
        [Description("验证该时间段里面是否存在出差")]
        [HttpPost]
        [Open]
        public JsonResult CheckOut(string c_begintime, string c_endtime)
        {
            string CheckOutApplySubmitc_oid = CookieHelper.GetCookie("c_oid");

            DataTable dtpResult = WMFactory.Wsrr.CheckOut(CheckOutApplySubmitc_oid, c_begintime, c_endtime);


            string jsonStr = JsonHelper.ToJson(dtpResult);
            return Json(ResultMsg.Success(jsonStr));
        }

        [Action]
        [Description("出差申请提交")]
        [HttpPost]
        [Open]
        public JsonResult OutApplySubmit(string sp1, string sp2, string c_remark, string begindate, string enddate, string c_value, string c_attitemid
            , string c_vehicle, string c_reason, string c_destname, string c_destaddress, string c_destination, string c_contactperson, string c_contactphone)
        {
            string OutApplySubmitc_oid = CookieHelper.GetCookie("c_oid");

            DataTable dtpResult = WMFactory.Wsrr.OutApplySubmit(OutApplySubmitc_oid, sp1, sp2, c_remark, begindate, enddate, c_value, c_attitemid,
            c_vehicle, c_reason, c_destname, c_destaddress, c_destination, c_contactperson, c_contactphone);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }


        [Page]
        [Description("审批出差数据加载")]
        public ActionResult OutGetApprove()
        {
            string c_oid = CookieHelper.GetCookie("c_oid");
            //c_oid = "81505586";
            ViewBag.OutGetApprove = WMFactory.Wsrr.OutGetApprove(c_oid);
            return View();
        }
        [Action]
        [Description("审批出差提交")]
        [HttpPost]
        [Open]
        public JsonResult OutApproveSubmit(string c_remark, string applec_oid, string c_approveflowid, string c_oid_outapply, string businessouttype)
        {
            string OutApproveSubmitc_oid = CookieHelper.GetCookie("c_oid");//员工号81505586
            //OutApproveSubmitc_oid = "81505586";
            string OutApproveSubmitc_oid_user = CookieHelper.GetCookie("c_oid_user");//员工编号(操作员)

            DataTable dtpResult = WMFactory.Wsrr.OutApproveSubmit(OutApproveSubmitc_oid_user, c_remark, OutApproveSubmitc_oid_user, applec_oid,
                                                c_approveflowid, c_oid_outapply, businessouttype);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }

        #endregion

        #region 行动计划

        [Page]
        [Description("行动计划登入")]
        public ActionResult PromiseLogin()
        {
            return View();
        }

        [Page]
        [Description("我的承诺")]
        public ActionResult PromiseIndex()
        {
            if (CookieHelper.GetCookie("c_code") == "" || CookieHelper.GetCookie("c_code") == null || CookieHelper.GetCookie("c_code") == "null")
            {
                return Redirect("~/HR/EHRManagement/PromiseLogin");
            }
            return View();
        }

        [Page]
        [Description("新增我的行动计划")]
        public ActionResult PromiseAdd()
        {
            if (CookieHelper.GetCookie("c_code") == "" || CookieHelper.GetCookie("c_code") == null || CookieHelper.GetCookie("c_code") == "null")
            {
                return Redirect("~/HR/EHRManagement/PromiseLogin");
            }
            string c_unitname = CookieHelper.GetCookie("c_unitname");
            string c_code = CookieHelper.GetCookie("c_code");
            string c_jobname = CookieHelper.GetCookie("c_jobname");
            string UserNameC = CookieHelper.GetCookie("UserNameC");

            DataTable dtpResult = WMFactory.Wsrr.PromiseSearch(" where c_code = '" + c_code + "'");
            if (dtpResult.Rows.Count > 0)
            {
                ViewBag.ActionPlan1 = dtpResult.Rows[0]["ActionPlan1"];
                ViewBag.ActionPlan2 = dtpResult.Rows[0]["ActionPlan2"];
                ViewBag.ActionPlan3 = dtpResult.Rows[0]["ActionPlan3"];
            }
            else
            {
                ViewBag.ActionPlan1 = "";
                ViewBag.ActionPlan2 = "";
                ViewBag.ActionPlan3 = "";
            }
            ViewBag.c_unitname = c_unitname;
            ViewBag.c_code = c_code;
            ViewBag.c_jobname = c_jobname;
            ViewBag.UserNameC = UserNameC;

            return View();
        }

        [Action]
        [Description("行动计划维护")]
        [HttpPost]
        [Open]
        public JsonResult PromiseEdit(string ActionPlan1, string ActionPlan2, string ActionPlan3)
        {
            string c_unitname = CookieHelper.GetCookie("c_unitname");
            string c_code = CookieHelper.GetCookie("c_code");
            string c_jobname = CookieHelper.GetCookie("c_jobname");
            string UserNameC = CookieHelper.GetCookie("UserNameC");

            DataTable dtpResult = WMFactory.Wsrr.PromiseEdit(c_unitname, c_code, c_jobname, UserNameC, ActionPlan1, ActionPlan2, ActionPlan3);

            if (dtpResult.Rows[0][0].ToString().ToLower() == "true")
            {
                return Json(ResultMsg.Success("提交成功"));
            }
            else
            {
                return Json(ResultMsg.Failure("失败"));
            }
        }

        [Page]
        [Description("查询别人的行动计划")]
        public ActionResult PromiseSearchOther()
        {
            if (CookieHelper.GetCookie("c_code") == "" || CookieHelper.GetCookie("c_code") == null || CookieHelper.GetCookie("c_code") == "null")
            {
                return Redirect("~/HR/EHRManagement/PromiseLogin");
            }
            return View();
        }



        [Action]
        [Description("行动计划查询")]
        public PartialViewResult PromiseSearch(string type, string c_unitname, string c_code, string c_jobname, string UserNameC)
        {
            string PromiseWhere;
            if (type == "1")//自己
            {
                PromiseWhere = " where c_code='" + c_code + "'";
            }
            else
            {
                PromiseWhere = " where 1=1 ";
                if (c_code != "")
                {
                    PromiseWhere += " and c_code = '" + c_code + "'";
                }
                if (UserNameC != "")
                {
                    PromiseWhere += " and UserNameC = '" + UserNameC + "'";
                }
                if (c_unitname != "")
                {
                    PromiseWhere += " and c_unitname like '%" + c_unitname + "%'";
                }
            }

            if (WMFactory.Wsrr.PromiseSearch(PromiseWhere).Rows[0]["c_code"].ToString() == "")
            {
                ViewBag.PromiseSearchInfo = "";
            }
            else
            {
                ViewBag.PromiseSearchInfo = WMFactory.Wsrr.PromiseSearch(PromiseWhere);
            }
            return PartialView();
        }

        [Page]
        [Description("别人的行动计划")]
        public ActionResult PromiseSearchOtherInfo(string c_code)
        {
            if (CookieHelper.GetCookie("c_code") == "" || CookieHelper.GetCookie("c_code") == null || CookieHelper.GetCookie("c_code") == "null")
            {
                return Redirect("~/HR/EHRManagement/PromiseLogin");
            }
            DataTable dtpResult = WMFactory.Wsrr.PromiseSearch(" where c_code = '" + c_code + "'");
            ViewBag.dtpResult = dtpResult;
            return View();
        }

        #endregion
    }
}
