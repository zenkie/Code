﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.ModelConfiguration.Conventions;
using ElegantWM.EntityModel;
using System.Configuration;
/**
 * 作者：陈杰
 * ＱＱ：710782046
 * 时间：2012-08-10
 * 功能：EF配置文件，支持多数据库
 **/
namespace ElegantWM.DAL
{
    public class DB : DbContext
    {
        //public static readonly log4net.ILog log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        //配置连接串,默认数据库DefaultDB
        public DB(string _ConnectStr)
            : base()
        {
            Database.Connection.ConnectionString = ConfigurationManager.ConnectionStrings[_ConnectStr].ToString();
            Database.SetInitializer<DB>(null);
            //this.Configuration.LazyLoadingEnabled = false;
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //已经存在的数据库，不然会出现负数
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();            
            base.OnModelCreating(modelBuilder);
        }
		
		//注册到EF
		public DbSet<HR_Jobs> Jobs { get; set; }
		public DbSet<HR_JobSeeker> JobSeeker { get; set; }
		public DbSet<WX_Account> WXAccount { get; set; }
		public DbSet<HR_Course> HRCourse { get; set; }
		public DbSet<HR_CourseAttend> HRCourseAttend { get; set; }
		public DbSet<HR_CourseLesson> HRCourseLesson { get; set; }
		public DbSet<HR_CourseUser> HRCourseUser { get; set; }
		public DbSet<HR_LK_CourseUser> HRLKCourseUser { get; set; }
		public DbSet<WX_Fans> WXFans { get; set; }
		public DbSet<WX_Menu> WXMenu { get; set; }
		public DbSet<HR_WX_Employee> HRWXEmployee { get; set; }
		public DbSet<HR_Question> HRQuestion { get; set; }
		public DbSet<HR_QARst> HRQARst { get; set; }
        public DbSet<V_HR_CourseSignRst> VSignRst { get; set; }
		public DbSet<WX_LK_FansC3AM> WXLKFansC3AM { get; set; }
		public DbSet<ITSM_Engineer> ITSMEngineer { get; set; }
		public DbSet<ITSM_Event> ITSMEvent { get; set; }
		public DbSet<ITSM_EventLog> ITSMEventLog { get; set; }
		public DbSet<ITSM_EgrSchedule> ITSMEgrSchedule { get; set; }
		public DbSet<ITSM_BasicInfo> ITSMBasicInfo { get; set; }
		public DbSet<WX_Contacts> WXContacts { get; set; }
		public DbSet<S3_Dictionary> S3Dictionary { get; set; }
		public DbSet<SHOP_CustomerFeedback> SHOPCustomerFeedback { get; set; }
		public DbSet<NPaiaVipUser> NPaiaVipUser { get; set; }
        public DbSet<OO_Industry> OO_Industry { get; set; }
        public DbSet<OO_MenuTemplate> OO_MenuTemplate { get; set; }
        public DbSet<WX_RespImgTxt> WXRespImgTxt { get; set; }
        public DbSet<WX_KeyWord> WXKeyWord { get; set; }
		public DbSet<WX_ArticleLog> WXArticleLog { get; set; }
		public DbSet<WX_LK_RegMemberFans> WXLKRegMemberFans { get; set; }
		public DbSet<Shop_Event> SHOPEvent { get; set; }
		public DbSet<Shop_EventFeedback> SHOPEventFeedback { get; set; }
		public DbSet<Game_Award> GameAward { get; set; }
		public DbSet<Game_Record> GameRecord { get; set; }
		public DbSet<Game_Question> GameQuestion { get; set; }
		public DbSet<Game_Answer> GameAnswer { get; set; }
		public DbSet<Game_QARst> GameQARst { get; set; }
		public DbSet<Game_QAVolunteer> GameQAVolunteer { get; set; }
		public DbSet<Fire_Question> Fire_Question { get; set; }
        public DbSet<Game_LittleModelInfo> Game_LittleModel { get; set; }
        public DbSet<Game_LittleModelResult> Game_LittleModelResult { get; set; }
		public DbSet<Game_UserInfo> GameUserInfo { get; set; }
		public DbSet<Game_Link> GLGameLink { get; set; }
		public DbSet<HR_Specific> HRSpecific { get; set; }
        public DbSet<Game_Ticket> GameTicket { get; set; }
		public DbSet<WX_Account_USER_AUZ> WX_Account_USER_AUZ { get; set; }
		public DbSet<Game_Qrst> Game_Qrst { get; set; }
		public DbSet<WX_QR_Code> WX_QR_Code { get; set; }
		public DbSet<WX_QR_CodeScanFans> WX_QR_CodeScanFans { get; set; }
		public DbSet<Game_Img> Game_Img { get; set; }
		/*DBSET*/
        
    }
}
