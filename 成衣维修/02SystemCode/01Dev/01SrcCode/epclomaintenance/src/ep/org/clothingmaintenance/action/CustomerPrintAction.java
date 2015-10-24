/*
 * Generated by MyEclipse Struts
 * Template path: templates/java/JavaClass.vtl
 */
package ep.org.clothingmaintenance.action;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import ep.org.clothingmaintenance.bean.MaintenanceBill;
import ep.org.clothingmaintenance.form.CustomerPrintForm;
import ep.org.clothingmaintenance.service.CloMaintenanceService;

/** 
 * MyEclipse Struts
 * Creation date: 02-29-2012
 * 
 * XDoclet definition:
 * @struts.action parameter="method"
 * @struts.action-forward name="toCustomerPrint" path="/colmaintenance/customerPrint.jsp"
 */
public class CustomerPrintAction extends DispatchAction {
	public ActionForward getShopPrintData(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		String guid = request.getParameter("guid");
		CustomerPrintForm customerPrintForm = (CustomerPrintForm)form;
		customerPrintForm.setGuid(guid);
		CloMaintenanceService service = new CloMaintenanceService();
		MaintenanceBill bean = (MaintenanceBill) service.getShopPrintData(guid);
		
		customerPrintForm.setDh(bean.getDh());
		customerPrintForm.setPP(bean.getPP());
		customerPrintForm.setDpmc(bean.getDpmc());
		customerPrintForm.setGKWX(bean.getGKWX());
		customerPrintForm.setDZXM(bean.getDZXM());
		customerPrintForm.setGKXM(bean.getGKXM());
		customerPrintForm.setGKLXDH(bean.getGKLXDH());
		customerPrintForm.setWXCBM(bean.getWXCBM());
		customerPrintForm.setVIPKH(bean.getVIPKH());
		customerPrintForm.setSLDG(bean.getSLDG());
		customerPrintForm.setDGLXDH(bean.getDGLXDH());
		customerPrintForm.setSFTYFFWX(bean.getSFTYFFWX());
		customerPrintForm.setKH(bean.getKH());
		customerPrintForm.setYS(bean.getYS());
		customerPrintForm.setMS(bean.getMS());
		customerPrintForm.setSCSJ(bean.getSCSJ());
		customerPrintForm.setWTMS(bean.getWTMS());
		customerPrintForm.setYSGS(bean.getYSGS());
		customerPrintForm.setYDH(bean.getYDH());
		customerPrintForm.setFHDZ(bean.getFHDZ());
		customerPrintForm.setTHRQ(bean.getTHRQ());
		
		return mapping.findForward("toCustomerPrint");
	}
}