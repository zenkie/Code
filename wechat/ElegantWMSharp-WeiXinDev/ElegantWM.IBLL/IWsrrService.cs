﻿using ElegantWM.DTO;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElegantWM.IBLL
{
    public interface IWsrrService
    {

        #region 短信验证码通用调用的WSRR
        /// <summary>
        /// 发送短信验证码
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable SendSmsAnyTelCommonInterface(string phone, string system, string com);

        /// <summary>
        /// 短信验证码通用
        /// </summary>
        /// <param name="VipTel"></param>
        /// <param name="AuthCode"></param>
        /// <returns></returns>
        DataTable CheckAuthCodeCommonInterface(string phone, string AuthCode);

        #endregion

        #region MDM省市店铺获取通用WSRR
        /// <summary>
        /// 省
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable GetProvinceCommonInterface();

        /// <summary>
        /// 市
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable GetCiteCommonInterface(string where);

        /// <summary>
        /// 区
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable GetCountyCommonInterface(string Where);

        /// <summary>
        /// 店铺
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable GetMDMDepot(string where);
        #endregion

        #region VIP通用接口（新增修改查询包括积分）
        /// <summary>
        /// VIP查询（积分等）
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable GetCustomerInfoCommonInterface(string pstrType, string pstrCOM, string pstrWXID, string pstrCODE, string pstrPHONE, string pstrVIPCODE, string pstrVIPID);


        /// <summary>
        /// VIP新增
        /// Type 1 微信 2 官网
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable AddCustomerInfoCommonInterface(string pstrType, string pstrCOM, string pstrNAME, string pstrPHONE, string pstrWXID, string pstrCODE, string pstrSEX
           , string pstrEMAIL, string pstrBIRTHDAY, string pstrPROVINCE, string pstrCITY, string pstrCOUNTY, string pstrOCCUPATION, string pstrWXNICK, string pstrVIPADD);

        /// <summary>
        /// VIP修改
        /// Type 1 微信 2 官网
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable UpdateCustomerInfoCommonInterface(string pstrType, string pstrCOM, string pstrNAME, string pstrPHONE, string pstrWXID, string pstrCODE, string pstrSEX
           , string pstrEMAIL, string pstrBIRTHDAY, string pstrPROVINCE, string pstrCITY, string pstrCOUNTY, string pstrOCCUPATION, string pstrWXNICK, string pstrVIPADD);


        /// <summary>
        /// VIP消费记录
        /// </summary>
        /// <param name="pstrCOM">EP GL DL GL NP JL</param>
        /// <param name="pstrConditionID">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrConditionValue">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <returns></returns>
        DataTable GetCustomerRetailInfoCommonInterface(string pstrCOM, string pstrConditionID, string pstrConditionValue);
        #endregion

        #region 券通用接口（券查询新增积分兑换送券）

        /// <summary>
        /// 券查询
        /// </summary>
        /// <param name="pstrCOM">EP GL DL GL NP JL</param>
        /// <param name="pstrConditionID">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrConditionValue">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <returns></returns>
        DataTable GetCustomerTicketInfoCommonInterface(string pstrCOM, string pstrConditionID, string pstrConditionValue);


        /// <summary>
        /// 送券
        /// </summary>
        /// <param name="pstrCOM">EP GL DL GL NP JL</param>
        /// <param name="pstrConditionID">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrConditionValue">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrEffectiveWay">生效方式 0 有效天数;1 截止日期;2 日期段	INT	PS:日期段方式 结束日期那天券就失效</param>
        /// <param name="pstrType">券类型 0 抵值券; 1 现金券; 2 打折券	INT</param>
        /// <param name="pstrTicketName">券名称显示在前台的名称啦</param>
        /// <param name="pstrTicketTypeNumber">券类型编号需在DRP系统存在，并且使用每个公司自己的 </param>
        /// <param name="pstrParType">面值类型1 代表面值88块钱</param>
        /// <param name="pstrDay">EffectiveWay 为0 Day必须传</param>
        /// <param name="pstrUpToTime">为1 UpToTime必须传</param>
        /// <param name="pstrBeginDate">为2 BeginDate EndDate必须传</param>
        /// <param name="pstrEndDate">为2 BeginDate EndDate必须传</param>
        /// <returns></returns>
        DataTable AddCustomerTicketInfoCommonInterface(string pstrCOM, string pstrConditionID, string pstrConditionValue, string pstrEffectiveWay,
                                                             string pstrType, string pstrTicketName, string pstrTicketTypeNumber, string pstrParType,
                                                             string pstrDay, string pstrUpToTime, string pstrBeginDate, string pstrEndDate);

        /// <summary>
        /// 积分送券
        /// </summary>
        /// <param name="pstrCOM">EP GL DL GL NP JL</param>
        /// <param name="pstrConditionID">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrConditionValue">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrEffectiveWay">生效方式 0 有效天数;1 截止日期;2 日期段	INT	PS:日期段方式 结束日期那天券就失效</param>
        /// <param name="pstrType">券类型 0 抵值券; 1 现金券; 2 打折券	INT</param>
        /// <param name="pstrTicketName">券名称显示在前台的名称啦</param>
        /// <param name="pstrTicketTypeNumber">券类型编号需在DRP系统存在，并且使用每个公司自己的 </param>
        /// <param name="pstrDeductionIntegralType">扣减积分 1代表5000分 2代表10000分 </param>
        /// <param name="pstrParType">面值类型1 代表面值88块钱 2 200宽前</para块钱
        /// <param name="pstrDay">EffectiveWay 为0 Day必须传</param>
        /// <param name="pstrUpToTime">为1 UpToTime必须传</param>
        /// <param name="pstrBeginDate">为2 BeginDate EndDate必须传</param>
        /// <param name="pstrEndDate">为2 BeginDate EndDate必须传</param>
        /// <returns></returns>
        DataTable AddTicketByExchangeIntegralCommonInterface(string pstrCOM, string pstrConditionID, string pstrConditionValue, string pstrEffectiveWay,
                                                             string pstrType, string pstrTicketName, string pstrTicketTypeNumber, string pstrDeductionIntegralType,
                                                             string pstrParType, string pstrDay, string pstrUpToTime, string pstrBeginDate, string pstrEndDate);

        #endregion

        #region
        /// <summary>
        ///  VIP积分
        /// </summary>
        /// <param name="pstrCOM">EP GL DL GL NP JL</param>
        /// <param name="pstrConditionID">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrConditionValue">1	WeiXinid	2	OnlineVipid	3	Mobtel	4	Vipcode	5	vipid</param>
        /// <param name="pstrType">Add 增加积分	；Decrease 减少积分	</param>
        /// <param name="pstrIntegral">积分兑换券 必须传入，且不允许小于等于零	</param>
        /// <returns></returns>
        DataTable CustomerJFchangeCommonInterface(string pstrCOM, string pstrConditionID, string pstrConditionValue, string pstrType, string pstrIntegral,
                                                 string pstrRemarks);
        #endregion

        #region 3S调用的WSRR
        /// <summary>
        /// 根据手机获取vip名称和消费金额
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        string GetVipInfo(string tel);

        /// <summary>
        /// 校验产品是否存在
        /// </summary>
        /// <param name="skc"></param>
        /// <returns></returns>
        DataTable CheckSKC(string skc);

        /// <summary>
        /// 发送短信验证码
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable SendSMS(string tel);

        /// <summary>
        /// S3用户注册
        /// </summary>
        /// <param name="tel"></param>
        /// <param name="oid"></param>
        /// <param name="pwd"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        DataTable Register3S(string tel, string oid, string pwd, string code);

        /// <summary>
        /// 绑定EHR和POS
        /// </summary>
        /// <param name="tel"></param>
        /// <param name="ehrName"></param>
        /// <param name="idCode"></param>
        /// <param name="posCode"></param>
        /// <returns></returns>
        DataTable BindEhrDrp(string tel, string ehrName, string idCode, string posCode, bool isRePos = false);


        /// <summary>
        /// wsrr判断是否离职，绑定，获取店铺名称，编号等基本信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable CheckS3UserBind(string oid);

        /// <summary>
        /// 根据当前登录账号获取店铺信息
        /// </summary>
        /// <param name="depotid"></param>
        /// <returns></returns>
        DataTable GetUserDeptInfo(string depotid);

        #endregion

        #region NPaia调用的WSRR
        /// <summary>
        /// 根据当前登录手机号码获取VIP积分
        /// </summary>
        /// <param name="viptel"></param>
        /// <returns></returns>
        DataTable GetUserCentumInfo(string viptel);

        /// <summary>
        /// 插入DRP会员
        /// </summary>
        /// <param name="VipTel"></param>
        /// <param name="VipSex"></param>
        /// <param name="VipName"></param>
        /// <returns></returns>
        DataTable VipUserForC3(string VipTel, string VipSex, string VipName);

        /// <summary>
        /// NPaia手机验证码验证
        /// </summary>
        /// <param name="VipTel"></param>
        /// <param name="AuthCode"></param>
        /// <returns></returns>
        DataTable CheckAuthCode(string VipTel, string AuthCode);

        /// <summary>
        /// 发送短信验证码
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable SendSmsAnyTel(string tel);

        /// <summary>
        /// 查询款式信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetStyleInfo(string where);

        /// <summary>
        /// 查询款式SKU信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetStyleSKU(string where);

        /// <summary>
        /// 添加购物车信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable AddShoppingCart(string oid, string skuid, string number, string price, string sellprice, string name);

        /// <summary>
        /// 根据主题查询款式SKU信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetStyleSKUByTheme(string where);

        /// <summary>
        /// 查询购物车信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetShoppingCart(string where);

        /// <summary>
        /// 删除购物车信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        DataTable DelShoppingCart(string id);

        /// <summary>
        /// 添加订单信息
        /// </summary>
        /// <param name="oid"></param>
        /// <param name="head"></param>
        /// <returns></returns>
        DataTable AddOrder(string oid, OrderHeadDto head);

        /// <summary>
        /// 查询订单信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable GetOrder(string where);

        /// <summary>
        /// 查询省份信息
        /// </summary>
        /// <returns></returns>
        DataTable GetProvince();

        /// <summary>
        /// 查询市信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetCity(string where);

        /// <summary>
        /// 查询店铺信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetDepot(string where);

        #endregion

        #region 雅斓微站WSRR
        /// <summary>
        /// 查询款式信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GLGetStyleInfo(string where);

        /// <summary>
        /// 查询款式SKU信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GLGetStyleSKU(string where);

        /// <summary>
        /// 添加购物车信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable GLAddShoppingCart(string oid, string skuid, string number, string price, string sellprice, string name);

        /// <summary>
        /// 查询购物车信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GLGetShoppingCart(string where);

        /// <summary>
        /// 删除购物车信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        DataTable GLDelShoppingCart(string id);

        /// <summary>
        /// 查询订单信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable GLGetOrder(string where);

        /// <summary>
        /// 添加订单信息
        /// </summary>
        /// <param name="oid"></param>
        /// <param name="head"></param>
        /// <returns></returns>
        DataTable GLAddOrder(string oid, OrderHeadDto head);

        /// <summary>
        /// 查询主题
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GLGetTheme(string where);

        #endregion

        #region 贝爱微站WSRR
        /// <summary>
        /// 查询款式信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLGetStyleInfo(string where);

        /// <summary>
        /// 查询款式SKU信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLGetStyleSKU(string where);

        /// <summary>
        /// 添加购物车信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable DLAddShoppingCart(string oid, string skuid, string number, string price, string sellprice, string name);

        /// <summary>
        /// 查询购物车信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLGetShoppingCart(string where);

        /// <summary>
        /// 删除购物车信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        DataTable DLDelShoppingCart(string id);

        /// <summary>
        /// 查询订单信息
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable DLGetOrder(string where);

        /// <summary>
        /// 添加订单信息
        /// </summary>
        /// <param name="oid"></param>
        /// <param name="head"></param>
        /// <returns></returns>
        DataTable DLAddOrder(string oid, OrderHeadDto head);

        /// <summary>
        /// 删除订单信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLDelCustomerOrder(string where);

        /// <summary>
        /// 获取主题
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLGetTheme();

        /// <summary>
        /// 获取公告
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLGetNotice();

        /// <summary>
        /// 获取特权
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable DLGetVIPPrivilege();


        #endregion

        #region VexSSO相关
        DataTable VexSSORegAndBindAM(string tel, string pwd, string amuser, string ampwd, string code, bool reged);
        DataTable VexSSOBind(string tel, string pwd, string type, string destuser, string destpwd);
        /// <summary>
        /// 立即更新C3AM的用户名和密码
        /// </summary>
        /// <param name="amuser"></param>
        /// <param name="tel"></param>
        /// <param name="pwd"></param>
        void UpdateC3AMUser(string amuser, string tel, string pwd);
        /// <summary>
        /// 获取验证码，用于找回密码
        /// </summary>
        /// <param name="tel"></param>
        /// <returns></returns>
        DataTable VexSSOGetPwdCode(string tel);

        /// <summary>
        /// 将密码发送到手机
        /// </summary>
        /// <param name="tel"></param>
        /// <param name="code"></param>
        /// <returns></returns>
        DataTable VexSSOSendPwd2Phone(string tel, string code);
        #endregion

        #region CMT反馈接口
        /// <summary>
        /// 查询客户任务明细视图
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetTaskView(string where);

        /// <summary>
        /// 查询客户信息
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetCustomerInfo(string where);

        /// <summary>
        /// 获取任务明细
        /// </summary>
        /// <param name="aml"></param>
        /// <returns></returns>
        DataSet GetTaskDetail(string aml);

        /// <summary>
        /// 获取预约下拉
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable GetFruit(string where);

        /// <summary>
        /// 拒绝原因
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        DataTable Refuse(string where);

        /// <summary>
        /// 反馈提交
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        DataTable FBSumbit(string xml);

        /// <summary>
        /// 到店反馈
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        DataTable FeedBackSumbitArrival(string xml);

        /// <summary>
        /// 获取导购列表
        /// </summary>
        /// <param name="Depotid">店铺ID</param>
        /// <returns></returns>
        DataTable SellerList(string Depotid);
        #endregion

        #region 3S薪资条调用的WSRR

        /// <summary>
        ///3S薪资条调用的WSRR
        /// </summary>
        /// <param name="身份证号"></param>
        /// <returns></returns>
        DataTable GetShopPay(string IdentityCard, string year, string month);

        /// <summary>
        ///根据微信号获取身份证
        /// </summary>
        /// <param name="oid"></param>
        /// <returns></returns>
        DataTable GetIdentityCardInfo(string oid);

        #endregion

        #region EHR考勤
        /// <summary>
        /// EHR考勤验证登入信息
        /// </summary>
        /// <param name="UserName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        DataTable CheckLogin(string UserName, string password);

        /// <summary>
        /// EHR获取公告信息
        /// </summary>
        /// <returns></returns>
        DataTable GetNotic();

        /// <summary>
        ///薪资条调用的WSRR
        /// </summary>
        /// <param name="身份证号"></param>
        /// <param name="年"></param>
        /// <param name="月"></param>
        /// <returns></returns>
        DataTable GetEHRForSalary(string password, string IdentityCard, string year, string month);

        /// <summary>
        ///打卡记录查询
        /// </summary>
        /// <param name="身份证号"></param>
        /// <param name="年"></param>
        /// <param name="月"></param>
        /// <returns></returns>
        DataTable AttendanceGet(string IdentityCard, string year, string month);

        /// <summary>
        ///补签考勤查询
        /// </summary>
        /// <param name="身份证号"></param>
        /// <param name="年"></param>
        /// <param name="月"></param>
        /// <returns></returns>
        DataTable AttendanceGetApply(string IdentityCard, string year, string month);

        /// <summary>
        ///审批人
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <param name="m_sfz"></param>
        /// <returns></returns>
        DataTable ApplyInfo(string m_c_oid, string m_sfz);

        /// <summary>
        ///考勤审批提交
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <param name="m_sfz"></param>
        /// <returns></returns>
        DataTable AttendanceSubmit(string name, string adddate, string adddate1, string adddate2, string addcause, string addchangeap1,
                                        string addchangeap2, string addremarks, string c_oid);

        /// <summary>
        ///获取审批考勤数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        DataTable AttendanceGetApprove(string m_c_oid);


        /// <summary>
        ///审批考勤数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        DataTable AttendanceApproveSubmit(string apptype, string c_oid, string m_oid_user, string c_approveflowid,
                                                string c_oid_renewcardsign, string c_remark, string c_renewremark);


        /// <summary>
        ///加班记录
        /// </summary>
        /// <param name="年"></param>
        /// <param name="月"></param>
        /// <param name="身份证号"></param>
        /// <returns></returns>
        DataTable OverTimeGet(string c_oid, string year, string month);


        /// <summary>
        ///加班申请提交
        /// </summary>
        /// <param name="c_oid"></param>
        /// <returns></returns>
        DataTable OverTimeApplySubmit(string c_oid, string sp1, string sp2, string c_remark, string begindate, string enddate, string c_value, string c_reason, string c_attitemid);

        /// <summary>
        ///获取加班审批数据
        /// </summary>
        /// <param name="c_oid"></param>
        /// <returns></returns>
        DataTable OverTimeGetApprove(string c_oid);


        /// <summary>
        ///审批加班数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        DataTable OverTimeApproveSubmit(string c_oid_overtimeapply, string applec_oid, string c_renewremark, string c_approveflowid,
                                                string m_c_oid, string m_oid_user, string c_remark, string approveType);

        /// <summary>
        ///休假查询
        /// </summary>
        /// <param name="年"></param>
        /// <param name="月"></param>
        /// <returns></returns>
        DataTable VacationGet(string c_oid, string year, string month);

        /// <summary>
        ///验证该时段是否有休假
        /// </summary>
        /// <param name="c_oid"></param>
        /// <returns></returns>
        DataTable CheckVacation(string c_oid, string c_begintime, string c_endtime);

        /// <summary>
        ///休假申请提交
        /// </summary>
        /// <param name="c_oid"></param>
        /// <returns></returns>
        DataTable VacationApplySubmit(string c_oid, string sp1, string sp2, string c_attitemoid, string c_year, string begindate, string enddate, string c_value, string c_reason,
         string c_principal, string c_linkman, string c_remark);


        /// <summary>
        ///获取休假审批数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        DataTable VacationGetApprove(string c_oid);

        /// <summary>
        ///审批休假数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        ///// 
        DataTable VacationApproveSubmit(string c_oid, string c_remark, string m_oid_user, string c_approveflowid, string c_oid_vocationapply, string vacationtype);

        /// <summary>
        ///出差查询
        /// </summary>
        /// <param name="年"></param>
        /// <param name="月"></param>
        /// <returns></returns>
        DataTable OutGet(string c_oid, string year, string month);

        /// <summary>
        ///验证该时段是否有出差
        /// </summary>
        /// <param name="c_oid"></param>
        /// <returns></returns>
        DataTable CheckOut(string c_oid, string c_begintime, string c_endtime);

        /// <summary>
        ///出差申请提交
        /// </summary>
        /// <param name="c_oid"></param>
        /// <returns></returns>
        DataTable OutApplySubmit(string c_oid, string sp1, string sp2, string c_remark, string begindate, string enddate, string c_value, string c_attitemid,
         string c_vehicle, string c_reason, string c_destname, string c_destaddress, string c_destination, string c_contactperson, string c_contactphone);

        /// <summary>
        ///获取出差审批数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        DataTable OutGetApprove(string c_oid);

        /// <summary>
        ///审批出差数据
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        ///// 
        DataTable OutApproveSubmit(string c_oid, string c_remark, string m_oid_user, string applec_oid, string c_approveflowid, string c_oid_outapply, string businessouttype);

        /// <summary>
        ///新增行动计划
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        ///// 
        DataTable PromiseEdit(string c_unitname, string c_code, string c_jobname, string UserNameC, string ActionPlan1, string ActionPlan2, string ActionPlan3);

        /// <summary>
        ///查询行动计划
        /// </summary>
        /// <param name="m_c_oid"></param>
        /// <returns></returns>
        ///// 
        DataTable PromiseSearch(string PromiseWhere);


        #endregion

        #region 卓莱雅券号创建券

        /// <summary>
        /// 卓莱雅券号创建券
        /// </summary>
        /// <param name="面币"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        DataTable JLTicketCreate(string sums);

        #endregion

        #region 验证小翅膀登入
        /// <summary>
        /// 验证小翅膀登入
        /// </summary>
        /// <param name="姓名"></param>
        /// <param password="密码"></param>
        /// <returns></returns>
        DataTable CheackAMUser(string password, string name);

        #endregion

    }
}