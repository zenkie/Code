﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.34011
//
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ElegantWM.DAL.WSRRTest {
    using System.Data;
    
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ServiceModel.ServiceContractAttribute(ConfigurationName="WSRRTest.WSRRSoap")]
    public interface WSRRSoap {
        
        // CODEGEN: 消息 CallByXMLContainBigDataRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CallByXMLContainBigData", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataResponse CallByXMLContainBigData(ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CallByXMLContainBigData", ReplyAction="*")]
        System.Threading.Tasks.Task<ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataResponse> CallByXMLContainBigDataAsync(ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest request);
        
        // CODEGEN: 消息 CallByXMLRequest 以后生成的消息协定具有标头
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CallByXML", ReplyAction="*")]
        [System.ServiceModel.XmlSerializerFormatAttribute(SupportFaults=true)]
        ElegantWM.DAL.WSRRTest.CallByXMLResponse CallByXML(ElegantWM.DAL.WSRRTest.CallByXMLRequest request);
        
        [System.ServiceModel.OperationContractAttribute(Action="http://tempuri.org/CallByXML", ReplyAction="*")]
        System.Threading.Tasks.Task<ElegantWM.DAL.WSRRTest.CallByXMLResponse> CallByXMLAsync(ElegantWM.DAL.WSRRTest.CallByXMLRequest request);
    }
    
    /// <remarks/>
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.Xml", "4.0.30319.33440")]
    [System.SerializableAttribute()]
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(Namespace="http://tempuri.org/")]
    public partial class HZYmessage : object, System.ComponentModel.INotifyPropertyChanged {
        
        private string errorMessageField;
        
        private string messageField;
        
        private string vexSSONewIDField;
        
        private string user_IDField;
        
        private string user_NameField;
        
        private string user_Name_CNField;
        
        private string loginEnv_IDField;
        
        private string loginEnv_SNField;
        
        private string company_SNField;
        
        private string company_IDField;
        
        private string env_IDField;
        
        private string env_SNField;
        
        private string session_IDField;
        
        private System.Xml.XmlAttribute[] anyAttrField;
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=0)]
        public string ErrorMessage {
            get {
                return this.errorMessageField;
            }
            set {
                this.errorMessageField = value;
                this.RaisePropertyChanged("ErrorMessage");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=1)]
        public string Message {
            get {
                return this.messageField;
            }
            set {
                this.messageField = value;
                this.RaisePropertyChanged("Message");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=2)]
        public string VexSSONewID {
            get {
                return this.vexSSONewIDField;
            }
            set {
                this.vexSSONewIDField = value;
                this.RaisePropertyChanged("VexSSONewID");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=3)]
        public string User_ID {
            get {
                return this.user_IDField;
            }
            set {
                this.user_IDField = value;
                this.RaisePropertyChanged("User_ID");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=4)]
        public string User_Name {
            get {
                return this.user_NameField;
            }
            set {
                this.user_NameField = value;
                this.RaisePropertyChanged("User_Name");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=5)]
        public string User_Name_CN {
            get {
                return this.user_Name_CNField;
            }
            set {
                this.user_Name_CNField = value;
                this.RaisePropertyChanged("User_Name_CN");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=6)]
        public string LoginEnv_ID {
            get {
                return this.loginEnv_IDField;
            }
            set {
                this.loginEnv_IDField = value;
                this.RaisePropertyChanged("LoginEnv_ID");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=7)]
        public string LoginEnv_SN {
            get {
                return this.loginEnv_SNField;
            }
            set {
                this.loginEnv_SNField = value;
                this.RaisePropertyChanged("LoginEnv_SN");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=8)]
        public string Company_SN {
            get {
                return this.company_SNField;
            }
            set {
                this.company_SNField = value;
                this.RaisePropertyChanged("Company_SN");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=9)]
        public string Company_ID {
            get {
                return this.company_IDField;
            }
            set {
                this.company_IDField = value;
                this.RaisePropertyChanged("Company_ID");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=10)]
        public string Env_ID {
            get {
                return this.env_IDField;
            }
            set {
                this.env_IDField = value;
                this.RaisePropertyChanged("Env_ID");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=11)]
        public string Env_SN {
            get {
                return this.env_SNField;
            }
            set {
                this.env_SNField = value;
                this.RaisePropertyChanged("Env_SN");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute(Order=12)]
        public string Session_ID {
            get {
                return this.session_IDField;
            }
            set {
                this.session_IDField = value;
                this.RaisePropertyChanged("Session_ID");
            }
        }
        
        /// <remarks/>
        [System.Xml.Serialization.XmlAnyAttributeAttribute()]
        public System.Xml.XmlAttribute[] AnyAttr {
            get {
                return this.anyAttrField;
            }
            set {
                this.anyAttrField = value;
                this.RaisePropertyChanged("AnyAttr");
            }
        }
        
        public event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
        
        protected void RaisePropertyChanged(string propertyName) {
            System.ComponentModel.PropertyChangedEventHandler propertyChanged = this.PropertyChanged;
            if ((propertyChanged != null)) {
                propertyChanged(this, new System.ComponentModel.PropertyChangedEventArgs(propertyName));
            }
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="CallByXMLContainBigData", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class CallByXMLContainBigDataRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string XmlInput;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=1)]
        public System.Data.DataSet dsExcel;
        
        public CallByXMLContainBigDataRequest() {
        }
        
        public CallByXMLContainBigDataRequest(ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string XmlInput, System.Data.DataSet dsExcel) {
            this.HZYmessage = HZYmessage;
            this.XmlInput = XmlInput;
            this.dsExcel = dsExcel;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="CallByXMLContainBigDataResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class CallByXMLContainBigDataResponse {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string CallByXMLContainBigDataResult;
        
        public CallByXMLContainBigDataResponse() {
        }
        
        public CallByXMLContainBigDataResponse(ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string CallByXMLContainBigDataResult) {
            this.HZYmessage = HZYmessage;
            this.CallByXMLContainBigDataResult = CallByXMLContainBigDataResult;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="CallByXML", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class CallByXMLRequest {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string XmlInput;
        
        public CallByXMLRequest() {
        }
        
        public CallByXMLRequest(ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string XmlInput) {
            this.HZYmessage = HZYmessage;
            this.XmlInput = XmlInput;
        }
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
    [System.ServiceModel.MessageContractAttribute(WrapperName="CallByXMLResponse", WrapperNamespace="http://tempuri.org/", IsWrapped=true)]
    public partial class CallByXMLResponse {
        
        [System.ServiceModel.MessageHeaderAttribute(Namespace="http://tempuri.org/")]
        public ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage;
        
        [System.ServiceModel.MessageBodyMemberAttribute(Namespace="http://tempuri.org/", Order=0)]
        public string CallByXMLResult;
        
        public CallByXMLResponse() {
        }
        
        public CallByXMLResponse(ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string CallByXMLResult) {
            this.HZYmessage = HZYmessage;
            this.CallByXMLResult = CallByXMLResult;
        }
    }
    
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public interface WSRRSoapChannel : ElegantWM.DAL.WSRRTest.WSRRSoap, System.ServiceModel.IClientChannel {
    }
    
    [System.Diagnostics.DebuggerStepThroughAttribute()]
    [System.CodeDom.Compiler.GeneratedCodeAttribute("System.ServiceModel", "4.0.0.0")]
    public partial class WSRRSoapClient : System.ServiceModel.ClientBase<ElegantWM.DAL.WSRRTest.WSRRSoap>, ElegantWM.DAL.WSRRTest.WSRRSoap {
        
        public WSRRSoapClient() {
        }
        
        public WSRRSoapClient(string endpointConfigurationName) : 
                base(endpointConfigurationName) {
        }
        
        public WSRRSoapClient(string endpointConfigurationName, string remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public WSRRSoapClient(string endpointConfigurationName, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(endpointConfigurationName, remoteAddress) {
        }
        
        public WSRRSoapClient(System.ServiceModel.Channels.Binding binding, System.ServiceModel.EndpointAddress remoteAddress) : 
                base(binding, remoteAddress) {
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataResponse ElegantWM.DAL.WSRRTest.WSRRSoap.CallByXMLContainBigData(ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest request) {
            return base.Channel.CallByXMLContainBigData(request);
        }
        
        public string CallByXMLContainBigData(ref ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string XmlInput, System.Data.DataSet dsExcel) {
            ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest inValue = new ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest();
            inValue.HZYmessage = HZYmessage;
            inValue.XmlInput = XmlInput;
            inValue.dsExcel = dsExcel;
            ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataResponse retVal = ((ElegantWM.DAL.WSRRTest.WSRRSoap)(this)).CallByXMLContainBigData(inValue);
            HZYmessage = retVal.HZYmessage;
            return retVal.CallByXMLContainBigDataResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataResponse> ElegantWM.DAL.WSRRTest.WSRRSoap.CallByXMLContainBigDataAsync(ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest request) {
            return base.Channel.CallByXMLContainBigDataAsync(request);
        }
        
        public System.Threading.Tasks.Task<ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataResponse> CallByXMLContainBigDataAsync(ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string XmlInput, System.Data.DataSet dsExcel) {
            ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest inValue = new ElegantWM.DAL.WSRRTest.CallByXMLContainBigDataRequest();
            inValue.HZYmessage = HZYmessage;
            inValue.XmlInput = XmlInput;
            inValue.dsExcel = dsExcel;
            return ((ElegantWM.DAL.WSRRTest.WSRRSoap)(this)).CallByXMLContainBigDataAsync(inValue);
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        ElegantWM.DAL.WSRRTest.CallByXMLResponse ElegantWM.DAL.WSRRTest.WSRRSoap.CallByXML(ElegantWM.DAL.WSRRTest.CallByXMLRequest request) {
            return base.Channel.CallByXML(request);
        }
        
        public string CallByXML(ref ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string XmlInput) {
            ElegantWM.DAL.WSRRTest.CallByXMLRequest inValue = new ElegantWM.DAL.WSRRTest.CallByXMLRequest();
            inValue.HZYmessage = HZYmessage;
            inValue.XmlInput = XmlInput;
            ElegantWM.DAL.WSRRTest.CallByXMLResponse retVal = ((ElegantWM.DAL.WSRRTest.WSRRSoap)(this)).CallByXML(inValue);
            HZYmessage = retVal.HZYmessage;
            return retVal.CallByXMLResult;
        }
        
        [System.ComponentModel.EditorBrowsableAttribute(System.ComponentModel.EditorBrowsableState.Advanced)]
        System.Threading.Tasks.Task<ElegantWM.DAL.WSRRTest.CallByXMLResponse> ElegantWM.DAL.WSRRTest.WSRRSoap.CallByXMLAsync(ElegantWM.DAL.WSRRTest.CallByXMLRequest request) {
            return base.Channel.CallByXMLAsync(request);
        }
        
        public System.Threading.Tasks.Task<ElegantWM.DAL.WSRRTest.CallByXMLResponse> CallByXMLAsync(ElegantWM.DAL.WSRRTest.HZYmessage HZYmessage, string XmlInput) {
            ElegantWM.DAL.WSRRTest.CallByXMLRequest inValue = new ElegantWM.DAL.WSRRTest.CallByXMLRequest();
            inValue.HZYmessage = HZYmessage;
            inValue.XmlInput = XmlInput;
            return ((ElegantWM.DAL.WSRRTest.WSRRSoap)(this)).CallByXMLAsync(inValue);
        }
    }
}
