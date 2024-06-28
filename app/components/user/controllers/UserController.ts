import { Request, Response } from "express";
import UserService from "../services/UserService.ts";
// import ApiFeatures from "../../../shared/services/ApiFeatures.ts";
import User from "../models/User.ts";
import bcrypt from 'bcrypt'
import auth from "../../../shared/middleware/auth.ts";
import mail from "../../../shared/utils/mail.ts";


class UserController {

  async createUser(req: Request, res: Response) {
    const { username, password, email, role } = req.body;

    const emailExist = await User.findOne({
      where: { email }
    });

    const mailResponse = await mail.sendEmail({
      to: email,
      html: `<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <title></title>
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--<![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
      #outlook a { padding:0; }
      body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
      table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
      img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
      p { display:block;margin:13px 0; }
    </style>
    <!--[if mso]>
    <noscript>
    <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <!--[if lte mso 11]>
    <style type="text/css">
      .mj-outlook-group-fix { width:100% !important; }
    </style>
    <![endif]-->
    
      <!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet" type="text/css">
<link href="https://fonts.googleapis.com/css?family=Ubuntu:400,700" rel="stylesheet" type="text/css">
        <style type="text/css">
          @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
@import url(https://fonts.googleapis.com/css?family=Ubuntu:400,700);
        </style>
      <!--<![endif]-->

    
    
    <style type="text/css">
      @media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
      }
    </style>
    <style media="screen and (min-width:480px)">
      .moz-text-html .mj-column-per-100 { width:100% !important; max-width: 100%; }
    </style>
    
  
    <style type="text/css">
    
    
    </style>
    <style type="text/css">
    .hide_on_mobile { display: none !important;} 
        @media only screen and (min-width: 480px) { .hide_on_mobile { display: block !important;} }
        .hide_section_on_mobile { display: none !important;} 
        @media only screen and (min-width: 480px) { 
            .hide_section_on_mobile { 
                display: table !important;
            } 

            div.hide_section_on_mobile { 
                display: block !important;
            }
        }
        .hide_on_desktop { display: block !important;} 
        @media only screen and (min-width: 480px) { .hide_on_desktop { display: none !important;} }
        .hide_section_on_desktop { 
            display: table !important;
            width: 100%;
        } 
        @media only screen and (min-width: 480px) { .hide_section_on_desktop { display: none !important;} }
        
          p, h1, h2, h3 {
              margin: 0px;
          }

          ul, li, ol {
            font-size: 11px;
            font-family: Ubuntu, Helvetica, Arial;
          }

          a {
              text-decoration: none;
              color: inherit;
          }

        @media only screen and (max-width:480px) {
            .mj-column-per-100 { width:100%!important; max-width:100%!important; }.mj-column-per-100 > .mj-column-per-100 { width:100%!important; max-width:100%!important; }
        }
    </style>
    
  </head>
  <body style="word-spacing:normal;background-color:#FFFFFF;">
    
    
      <div style="background-color:#FFFFFF;">
        
      
      <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="margin:0px auto;max-width:600px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:10px 0px 10px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="left" style="font-size:0px;padding:15px 15px 15px 15px;word-break:break-word;">
                  
      <div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1.5;text-align:left;color:#000000;"><h1 style="font-family: Ubuntu, sans-serif; font-size: 22px; text-align: center;"><span style="font-family: 'Open Sans', sans-serif;">Добро пожаловать!</span></h1></div>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" role="presentation" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
    
      
      <div style="margin:0px auto;max-width:600px;">
        
        <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
          <tbody>
            <tr>
              <td style="direction:ltr;font-size:0px;padding:10px 0px 10px 0px;text-align:center;">
                <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
            
      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
        <tbody>
          
              <tr>
                <td align="center" vertical-align="middle" style="font-size:0px;padding:20px 20px 20px 20px;word-break:break-word;">
                  
      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
        <tbody>
          <tr>
            <td align="center" bgcolor="#e85034" role="presentation" style="border:none;border-radius:8px;cursor:auto;font-style:normal;mso-padding-alt:10px 20px 10px 20px;background:#e85034;" valign="middle">
              <a href="https://google.com" style="display: inline-block; background: #e85034; color: #ffffff; font-family: Ubuntu, Helvetica, Arial, sans-serif, Helvetica, Arial, sans-serif; font-size: 13px; font-style: normal; font-weight: normal; line-height: 100%; margin: 0; text-decoration: none; text-transform: none; padding: 10px 20px 10px 20px; mso-padding-alt: 0px; border-radius: 8px;" target="_blank">
                <span>Продолжить регистрацию</span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    
                </td>
              </tr>
            
        </tbody>
      </table>
    
      </div>
    
          <!--[if mso | IE]></td></tr></table><![endif]-->
              </td>
            </tr>
          </tbody>
        </table>
        
      </div>
    
      
      <!--[if mso | IE]></td></tr></table><![endif]-->
    
    
      </div>
    
  </body>
</html>
  `
    })

    if (!mailResponse.success) {
      return res.status(400).send({ message: 'Что то пошло не так...' })
    }

    if (emailExist) {
      return res.status(400).send({ message: 'Такой Email уже существует' })
    }

    const user = await UserService.createUser({ username, password: await bcrypt.hash(password, 5), email, role });
    return res.json(user);
  }

  async signInUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.signInUser({ email });

      if (!user) {
        return res.status(404).json('Пользователь с таким Email не найден');
      }

      const passwordValid = await bcrypt.compare(password, user.dataValues.password);

      if (!passwordValid) {
        return res.status(404).json('Неверный логин или пароль');
      }

      const token = auth.generateToken({ id: user.dataValues.id, role: user.dataValues.role })

      return res.json({ token: token });
    } catch {
      return res.status(400).json({ message: 'Ошибка' });
    }
  }

  async getUsers(req: Request, res: Response) {

    try {

      const user = await UserService.getUsers()

      return res.status(200).json(user)

    } catch {

      return res.status(400).json("Ошибка")

    }
  }

  async getUserMe(req: any, res: Response) {

    try {

      auth.getIdByToken()

      const user = await UserService.getUserMe({ id: req.userId });

      return res.status(200).json(user)

    } catch {

      return res.status(400).json("Ошибка")

    }
  }

  async changeUserRole(req: any, res: Response) {

    try {

      const { id } = req.params;
      const { role } = req.body;
      const user = await UserService.updateUser({ role, id });

      return res.status(200).json(user)

    } catch {

      return res.status(400).json("Ошибка")

    }
  }


  async getUser(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserService.getUser({ id: +id });

    if (!user)
      return res.status(404).json({ message: "User not found" });
    return res.json(user);
  }

}

export default new UserController();
