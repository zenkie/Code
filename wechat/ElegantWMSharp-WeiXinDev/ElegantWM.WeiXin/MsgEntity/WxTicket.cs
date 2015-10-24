﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ElegantWM.WeiXin.MsgEntity
{
    public class WxTicket
    {
        /// <summary>
        /// errcode
        /// </summary>
        public int errcode { get; set; }
        /// <summary>
        /// errmsg
        /// </summary>
        public string errmsg { get; set; }
        /// <summary>
        /// ticket
        /// </summary>
        public string ticket { get; set; }
        /// <summary>
        /// 有效时间
        /// </summary>
        public int expires_in { get; set; }

        /// <summary>
        /// URL
        /// </summary>
        public string url { get; set; }
    }
}