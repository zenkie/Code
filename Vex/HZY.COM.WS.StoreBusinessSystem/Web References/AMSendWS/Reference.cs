﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.18449
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

// 
// 此源代码是由 Microsoft.VSDesigner 4.0.30319.18449 版自动生成。
// 
#pragma warning disable 1591

namespace HZY.COM.WS.StoreBusinessSystem.AMSendWS {
    using System;
    using System.Web.Services;
    using System.Diagnostics;
    using System.Web.Services.Protocols;
    using System.Xml.Serialization;
    using System.ComponentModel;
    
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Web.Services.WebServiceBindingAttribute(Name="MsgCenterSoap", Namespace="http://yj.chinacloudtech.com/")]
    public partial class MsgCenter : System.Web.Services.Protocols.SoapHttpClientProtocol {
        
        private System.Threading.SendOrPostCallback SendMsgOperationCompleted;
        
        private System.Threading.SendOrPostCallback SendMsgByComOperationCompleted;
        
        private System.Threading.SendOrPostCallback SendSubjectMsgOperationCompleted;
        
        private System.Threading.SendOrPostCallback SendSubjectMsgImmediatelyOperationCompleted;
        
        private System.Threading.SendOrPostCallback SendSQLOperationCompleted;
        
        private bool useDefaultCredentialsSetExplicitly;
        
        /// <remarks/>
        public MsgCenter() {
            this.Url = global::HZY.COM.WS.StoreBusinessSystem.Properties.Settings.Default.HZY_COM_WS_Mat_AMSendWS_MsgCenter;
            if ((this.IsLocalFileSystemWebService(this.Url) == true)) {
                this.UseDefaultCredentials = true;
                this.useDefaultCredentialsSetExplicitly = false;
            }
            else {
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        public new string Url {
            get {
                return base.Url;
            }
            set {
                if ((((this.IsLocalFileSystemWebService(base.Url) == true) 
                            && (this.useDefaultCredentialsSetExplicitly == false)) 
                            && (this.IsLocalFileSystemWebService(value) == false))) {
                    base.UseDefaultCredentials = false;
                }
                base.Url = value;
            }
        }
        
        public new bool UseDefaultCredentials {
            get {
                return base.UseDefaultCredentials;
            }
            set {
                base.UseDefaultCredentials = value;
                this.useDefaultCredentialsSetExplicitly = true;
            }
        }
        
        /// <remarks/>
        public event SendMsgCompletedEventHandler SendMsgCompleted;
        
        /// <remarks/>
        public event SendMsgByComCompletedEventHandler SendMsgByComCompleted;
        
        /// <remarks/>
        public event SendSubjectMsgCompletedEventHandler SendSubjectMsgCompleted;
        
        /// <remarks/>
        public event SendSubjectMsgImmediatelyCompletedEventHandler SendSubjectMsgImmediatelyCompleted;
        
        /// <remarks/>
        public event SendSQLCompletedEventHandler SendSQLCompleted;
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://yj.chinacloudtech.com/SendMsg", RequestNamespace="http://yj.chinacloudtech.com/", ResponseNamespace="http://yj.chinacloudtech.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string SendMsg(string Type, string System, string Receiver, string Sender, string Content, string SendTime) {
            object[] results = this.Invoke("SendMsg", new object[] {
                        Type,
                        System,
                        Receiver,
                        Sender,
                        Content,
                        SendTime});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void SendMsgAsync(string Type, string System, string Receiver, string Sender, string Content, string SendTime) {
            this.SendMsgAsync(Type, System, Receiver, Sender, Content, SendTime, null);
        }
        
        /// <remarks/>
        public void SendMsgAsync(string Type, string System, string Receiver, string Sender, string Content, string SendTime, object userState) {
            if ((this.SendMsgOperationCompleted == null)) {
                this.SendMsgOperationCompleted = new System.Threading.SendOrPostCallback(this.OnSendMsgOperationCompleted);
            }
            this.InvokeAsync("SendMsg", new object[] {
                        Type,
                        System,
                        Receiver,
                        Sender,
                        Content,
                        SendTime}, this.SendMsgOperationCompleted, userState);
        }
        
        private void OnSendMsgOperationCompleted(object arg) {
            if ((this.SendMsgCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.SendMsgCompleted(this, new SendMsgCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://yj.chinacloudtech.com/SendMsgByCom", RequestNamespace="http://yj.chinacloudtech.com/", ResponseNamespace="http://yj.chinacloudtech.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string SendMsgByCom(string Type, string System, string Receiver, string Sender, string Content, string SendTime, string Com) {
            object[] results = this.Invoke("SendMsgByCom", new object[] {
                        Type,
                        System,
                        Receiver,
                        Sender,
                        Content,
                        SendTime,
                        Com});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void SendMsgByComAsync(string Type, string System, string Receiver, string Sender, string Content, string SendTime, string Com) {
            this.SendMsgByComAsync(Type, System, Receiver, Sender, Content, SendTime, Com, null);
        }
        
        /// <remarks/>
        public void SendMsgByComAsync(string Type, string System, string Receiver, string Sender, string Content, string SendTime, string Com, object userState) {
            if ((this.SendMsgByComOperationCompleted == null)) {
                this.SendMsgByComOperationCompleted = new System.Threading.SendOrPostCallback(this.OnSendMsgByComOperationCompleted);
            }
            this.InvokeAsync("SendMsgByCom", new object[] {
                        Type,
                        System,
                        Receiver,
                        Sender,
                        Content,
                        SendTime,
                        Com}, this.SendMsgByComOperationCompleted, userState);
        }
        
        private void OnSendMsgByComOperationCompleted(object arg) {
            if ((this.SendMsgByComCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.SendMsgByComCompleted(this, new SendMsgByComCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://yj.chinacloudtech.com/SendSubjectMsg", RequestNamespace="http://yj.chinacloudtech.com/", ResponseNamespace="http://yj.chinacloudtech.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string SendSubjectMsg(string Type, string System, string Subject, string Receiver, string Sender, string Content, string SendTime, string Com) {
            object[] results = this.Invoke("SendSubjectMsg", new object[] {
                        Type,
                        System,
                        Subject,
                        Receiver,
                        Sender,
                        Content,
                        SendTime,
                        Com});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void SendSubjectMsgAsync(string Type, string System, string Subject, string Receiver, string Sender, string Content, string SendTime, string Com) {
            this.SendSubjectMsgAsync(Type, System, Subject, Receiver, Sender, Content, SendTime, Com, null);
        }
        
        /// <remarks/>
        public void SendSubjectMsgAsync(string Type, string System, string Subject, string Receiver, string Sender, string Content, string SendTime, string Com, object userState) {
            if ((this.SendSubjectMsgOperationCompleted == null)) {
                this.SendSubjectMsgOperationCompleted = new System.Threading.SendOrPostCallback(this.OnSendSubjectMsgOperationCompleted);
            }
            this.InvokeAsync("SendSubjectMsg", new object[] {
                        Type,
                        System,
                        Subject,
                        Receiver,
                        Sender,
                        Content,
                        SendTime,
                        Com}, this.SendSubjectMsgOperationCompleted, userState);
        }
        
        private void OnSendSubjectMsgOperationCompleted(object arg) {
            if ((this.SendSubjectMsgCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.SendSubjectMsgCompleted(this, new SendSubjectMsgCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://yj.chinacloudtech.com/SendSubjectMsgImmediately", RequestNamespace="http://yj.chinacloudtech.com/", ResponseNamespace="http://yj.chinacloudtech.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string SendSubjectMsgImmediately(string Type, string System, string Subject, string Receiver, string Sender, string Content, string SendTime, string Com) {
            object[] results = this.Invoke("SendSubjectMsgImmediately", new object[] {
                        Type,
                        System,
                        Subject,
                        Receiver,
                        Sender,
                        Content,
                        SendTime,
                        Com});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void SendSubjectMsgImmediatelyAsync(string Type, string System, string Subject, string Receiver, string Sender, string Content, string SendTime, string Com) {
            this.SendSubjectMsgImmediatelyAsync(Type, System, Subject, Receiver, Sender, Content, SendTime, Com, null);
        }
        
        /// <remarks/>
        public void SendSubjectMsgImmediatelyAsync(string Type, string System, string Subject, string Receiver, string Sender, string Content, string SendTime, string Com, object userState) {
            if ((this.SendSubjectMsgImmediatelyOperationCompleted == null)) {
                this.SendSubjectMsgImmediatelyOperationCompleted = new System.Threading.SendOrPostCallback(this.OnSendSubjectMsgImmediatelyOperationCompleted);
            }
            this.InvokeAsync("SendSubjectMsgImmediately", new object[] {
                        Type,
                        System,
                        Subject,
                        Receiver,
                        Sender,
                        Content,
                        SendTime,
                        Com}, this.SendSubjectMsgImmediatelyOperationCompleted, userState);
        }
        
        private void OnSendSubjectMsgImmediatelyOperationCompleted(object arg) {
            if ((this.SendSubjectMsgImmediatelyCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.SendSubjectMsgImmediatelyCompleted(this, new SendSubjectMsgImmediatelyCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        [System.Web.Services.Protocols.SoapDocumentMethodAttribute("http://yj.chinacloudtech.com/SendSQL", RequestNamespace="http://yj.chinacloudtech.com/", ResponseNamespace="http://yj.chinacloudtech.com/", Use=System.Web.Services.Description.SoapBindingUse.Literal, ParameterStyle=System.Web.Services.Protocols.SoapParameterStyle.Wrapped)]
        public string SendSQL(string SQL) {
            object[] results = this.Invoke("SendSQL", new object[] {
                        SQL});
            return ((string)(results[0]));
        }
        
        /// <remarks/>
        public void SendSQLAsync(string SQL) {
            this.SendSQLAsync(SQL, null);
        }
        
        /// <remarks/>
        public void SendSQLAsync(string SQL, object userState) {
            if ((this.SendSQLOperationCompleted == null)) {
                this.SendSQLOperationCompleted = new System.Threading.SendOrPostCallback(this.OnSendSQLOperationCompleted);
            }
            this.InvokeAsync("SendSQL", new object[] {
                        SQL}, this.SendSQLOperationCompleted, userState);
        }
        
        private void OnSendSQLOperationCompleted(object arg) {
            if ((this.SendSQLCompleted != null)) {
                System.Web.Services.Protocols.InvokeCompletedEventArgs invokeArgs = ((System.Web.Services.Protocols.InvokeCompletedEventArgs)(arg));
                this.SendSQLCompleted(this, new SendSQLCompletedEventArgs(invokeArgs.Results, invokeArgs.Error, invokeArgs.Cancelled, invokeArgs.UserState));
            }
        }
        
        /// <remarks/>
        public new void CancelAsync(object userState) {
            base.CancelAsync(userState);
        }
        
        private bool IsLocalFileSystemWebService(string url) {
            if (((url == null) 
                        || (url == string.Empty))) {
                return false;
            }
            System.Uri wsUri = new System.Uri(url);
            if (((wsUri.Port >= 1024) 
                        && (string.Compare(wsUri.Host, "localHost", System.StringComparison.OrdinalIgnoreCase) == 0))) {
                return true;
            }
            return false;
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    public delegate void SendMsgCompletedEventHandler(object sender, SendMsgCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class SendMsgCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal SendMsgCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    public delegate void SendMsgByComCompletedEventHandler(object sender, SendMsgByComCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class SendMsgByComCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal SendMsgByComCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    public delegate void SendSubjectMsgCompletedEventHandler(object sender, SendSubjectMsgCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class SendSubjectMsgCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal SendSubjectMsgCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    public delegate void SendSubjectMsgImmediatelyCompletedEventHandler(object sender, SendSubjectMsgImmediatelyCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class SendSubjectMsgImmediatelyCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal SendSubjectMsgImmediatelyCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    public delegate void SendSQLCompletedEventHandler(object sender, SendSQLCompletedEventArgs e);
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Web.Services", "4.0.30319.17929")]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    public partial class SendSQLCompletedEventArgs : System.ComponentModel.AsyncCompletedEventArgs {
        
        private object[] results;
        
        internal SendSQLCompletedEventArgs(object[] results, System.Exception exception, bool cancelled, object userState) : 
                base(exception, cancelled, userState) {
            this.results = results;
        }
        
        /// <remarks/>
        public string Result {
            get {
                this.RaiseExceptionIfNecessary();
                return ((string)(this.results[0]));
            }
        }
    }
}

#pragma warning restore 1591