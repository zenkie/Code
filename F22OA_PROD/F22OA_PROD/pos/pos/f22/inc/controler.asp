<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<%'
'核心控件控制,粒度是对单据的操作,用于全局查询界面,保存除制单外的所有信息.
dim Cfname,Cdname,Cuname,Dfname,Ddname,Duname
dim alt1,alt2,alt3,alt4,alt5,alt6,alt11,alt12,alt13,ext,exts,action,stype
dim page
  alt1="0"
  alt2="0"
  alt3="0"
  alt4="0"
  alt5="0"
  alt6="0"

  alt11="0"
  alt12="showModalDialog('djcopy.asp?djid='+id+'&oldformid="&session("formid")&"','e','dialogWidth:765px;dialogHeight:405px;center: yes;help:no;resizable:yes;status:no')"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt="&session("pksname")&"&numName=nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
  alt13="0"
  exts=""
  
  action=trim(request("action"))
  stype=trim(request.QueryString("stype"))
  if action<>"" then action=lcase(action)
  if trim(request("com"))<>"" then
    session("com")=trim(request("com"))
  else
    com=session("com")
  end if
  if stype="2" then exts="document.form1.submit()"
  
select case session("com") '每种单审核登帐时用到的字段名
case "2005" '进货->订货d_indent

  Cfname="chk_sure" '审核登帐字段名
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_indent.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有订货生成订货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  cPop="'e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no'"
  ePop="'e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no'"
  
  alt4="showModalDialog('create_indent.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_indent.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt="&session("pksname")&"&numName=nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"

  alt11="showModalDialog('create_indent.asp?action=create','e','dialogWidth:500px;dialogHeight:425px;center: yes;help:no;resizable:yes;status:no')"
case "2006" '进货->补货
  Cfname="chk_sure" '审核登帐字段名
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_indent.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  cPop="'e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no'"
  ePop="'e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no'"
  
  alt4="showModalDialog('create_indent.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_indent.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"

  alt11="showModalDialog('create_indent.asp?action=create','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
case "2010","2062":'进货->收货d_sell
  Cfname="getchk_sure"
  Cdname="getchk_date"
  Cuname="getchk_name"
  Dfname="get_sure"
  Ddname="getsure_date"
  Duname="getsure_name"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt="&session("pksname")&"&numName=set_nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
case "2050","2060":'加盟->发货->订货
  Cfname="chk_sure"
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_indent_jm.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_indent_jm.asp?action=create','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_indent_jm.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_indent_jm.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt12="showModalDialog('create_indent_jm.asp?id='+id+'&action=copy','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
case "2051","2061":'发货->补货
  Cfname="chk_sure"
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_indent_jm.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_indent_jm.asp?action=create','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_indent_jm.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_indent_jm.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt12="showModalDialog('create_indent_jm.asp?id='+id+'&action=copy','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
case "2052":'发货->配货d_quota
  Cfname="chk_sure"
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_quota.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_quota.asp?action=create','e','dialogWidth:500px;dialogHeight:450px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_quota.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:450px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_quota.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  
  botton="<input type='button' name='Submit' value='参照订补单(Q)' style='width:120px;' onClick='altq();' accesskey='q'>"
case "2053":'发货->发货
  Cfname="setchk_sure"
  Cdname="setchk_date"
  Cuname="setchk_name"
  Dfname="set_sure"
  Ddname="setsure_date"
  Duname="setsure_name"
  select case action
  case "create"
    create="create_sell.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_sell.asp?action=create','e','dialogWidth:500px;dialogHeight:450px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_sell.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:450px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_sell.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt="&session("pksname")&"&numName=set_nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
  botton="<input type='button' name='Submit' value='参照生成发货单(I)' style='width:120px;' onClick='alti();' accesskey='i'>"
case "2054":'发货->收货d_sell
  Cfname="getchk_sure"
  Cdname="getchk_date"
  Cuname="getchk_name"
  Dfname="get_sure"
  Ddname="getsure_date"
  Duname="getsure_name"
  alt6="0"
case "2055":'加盟->退货->退货发货d_outindent
 Cfname="getchk_sure"
 Cdname="getchk_suredate"
 Cuname="getchk_name"
 Dfname="get_sure"
 Ddname="getsure_date"
 Duname="getsure_name"
  select case action
  case "create"
    create="create_outindent.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_outindent.asp?action=create','e','dialogWidth:500px;dialogHeight:450px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_outindent.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:450px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_outindent.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
case "2056":'退货->退货收货
 Cfname="chk_sure"
 Cdname="chk_suredate"
 Cuname="chk_name"
 Dfname="sure"
 Ddname="sure_date"
 Duname="sure_name"
 alt6="0"

case "2017":'调拔发
  Cfname="setchk_sure"
  Cdname="setchk_date"
  Cuname="setchk_name"
  Dfname="set_sure"
  Ddname="setsure_date"
  Duname="setsure_name"
  select case action
  case "create"
    create="create_move.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_move.asp?action=create','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_move.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_move.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt="&session("pksname")&"&numName=set_nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
case "2018","2062":'调拔收货
  Cfname="getchk_sure"
  Cdname="getchk_date"
  Cuname="getchk_name"
  Dfname="get_sure"
  Ddname="getsure_date"
  Duname="getsure_name"
  select case action
  case "create"
    create="create_move.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_move.asp?action=create','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_move.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:400px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_move.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
case "2019":'店铺->零售'
  Cfname="chk_sure"
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_retail.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_retail.asp?action=create','e','dialogWidth:500px;dialogHeight:330px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_retail.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:330px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_retail.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
case "2020":'店铺->盘点
  Cfname="chk_sure"
  Cdname="chk_date"
  Cuname="chk_name"
  Dfname="sure"
  Ddname="sure_date"
  Duname="sure_name"
  select case action
  case "create"
    create="create_inventory.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_inventory.asp?action=create','e','dialogWidth:500px;dialogHeight:280px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_inventory.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:280px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_inventory.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
case "2011","2063" '正常换货
  Cfname="prop_sure"
  Cdname="propdate"
  Cuname="propname"
  Dfname="prop_sure"
  Ddname="propdate"
  Duname="propname"
  select case action
  case "create"
    create="create_outindent_zb.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_outindent_zb.asp?action=create','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_outindent_zb.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_outindent_zb.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt=outindentPRO&numName=nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
case "2012","2064" '特殊换货
  Cfname="prop_sure"
  Cdname="propdate"
  Cuname="propname"
  Dfname="prop_sure"
  Ddname="propdate"
  Duname="propname"
  select case action
  case "create"
    create="create_outindent_zb.asp"
  case "edit"
    edit="index.asp"
  case "del"
    del="index.asp"
  case "copy"
    copy="index.asp"
	button="<input type='button' name='Submit' value='根据已有补货生成补货单(C)' onClick='alt12();' accesskey='c'>"
  case "cont"
    cont=""
  case "search"
    search="index.asp"
  case "task"
    ext=""
  case "sure"
    sure="index.asp"
  case "unsure"
    unsure="index.asp"
  case "chksure"
    chksure="index.asp"
  case "unchksure"
    unchksure="index.asp"
  case "check"
    check="index.asp"
  case else
    Err.Raise 50001,"controler.select.select.1-1-1","没有为Action设置命令!"
  end select
  alt11="showModalDialog('create_outindent_zb.asp?action=create','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_outindent_zb.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_outindent_zb.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"&opt=outindentPRO&numName=nums','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
'case "2013" '换货审核
'  Cfname="chk_sure"
'  Cdname="chk_date"
'  Cuname="chk_name"
'  Dfname="sure"
'  Ddname="sure_date"
'  Duname="sure_name"
'  alt11="showModalDialog('create_outindent.asp?action=create','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
'  alt5="showModalDialog('create_outindent.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
'  alt6="showModalDialog('f22_main.asp?id='+id+'&pksname="&session("pksname")&"','e','dialogWidth:700px;dialogHeight:500px;center: yes;help:no;resizable:yes;status:no')"
'  alt4="showModalDialog('create_outindent.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
case "2014","2065" '换货发货
  Cfname="getchk_sure"
  Cdname="getchk_suredate"
  Cuname="getchk_name"
  Dfname="get_sure"
  Ddname="getsure_date"
  Duname="getsure_name"
  alt11="showModalDialog('create_outindent_zb.asp?action=create','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
  alt5="showModalDialog('create_outindent.asp?id='+id+'&action=edit','e','dialogWidth:500px;dialogHeight:320px;center: yes;help:no;resizable:yes;status:no')"
  alt4="showModalDialog('create_outindent.asp?id='+id+'&action=del','e','dialogWidth:1px;dialogHeight:1px;center: yes;help:no;resizable:yes;status:no')"
  alt6="0"
  response.Write "aaaaa"
'case "2015" '换货收货
'  Cfname="chk_sure"
'  Cdname="chk_date"
'  Cuname="chk_name"
'  Dfname="sure"
'  Ddname="sure_date"
'  Duname="sure_name"

end select
if session("com")="2014" then
 alt6="0"
end if
%>