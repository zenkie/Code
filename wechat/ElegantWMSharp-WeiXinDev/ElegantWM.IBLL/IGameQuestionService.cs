﻿using System;
using ElegantWM.EntityModel;
using System.Data;
using System.Collections.Generic;

/**
 * 作者：WebMisSharp
 * 时间：2014/11/17 15:06:10
 * 功能：业务逻辑接口
 * 版本：V1.0
 * 网站：http://www.chinacloudtech.com
 * ------------------------------------
 * 修改人：
 * 修改时间：
 * 修改内容：
 * 版本： 
 **/

namespace ElegantWM.IBLL
{
    public interface IGameQuestionService : IBaseService<Game_Question>
    {
        IEnumerable<Game_Question> GetQuestions(Guid TntId, string Type);
    }
}
