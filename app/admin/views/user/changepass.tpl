{include file='common/header.tpl'}
<form name="frmCategory" id="frmCategory" action="{$smarty.const.HOST_ADMIN}/user/dochange" method="post">
<input type="hidden" name="btSave" value="save"/>
<table width="100%" border="0" cellpadding="0" cellspacing="1">
	<tr class="label_title">
		<td colspan="2">Thay đổi mật khẩu</td>
	</tr>
	<tr class="login">
		<td width="20%">&nbsp;&nbsp;Mật khẩu cũ :<span class="alert">*</span></td>
		<td width="870%"><input type="password" id="input03" name="password" class="input-xlarge" required="required" autocomplete="off">
		</td>
	</tr>
	<tr class="login">
		<td width="20%">&nbsp;&nbsp;Mật khẩu mới :<span class="alert">*</span></td>
		<td width="870%"><input type="password" id="input04" name="new-password" class="input-xlarge" required="required" autocomplete="off" onchange="form.input05.pattern = this.value;">
		</td>
	</tr>
	<tr class="login">
		<td width="20%">&nbsp;&nbsp;Nhập lại mật khẩu :</td>
		<td width="870%">
			 <input type="password" id="input05" name="confirm-password" class="input-xlarge" required="required" autocomplete="off">
		</td>
	</tr>	
	<tr class="login">
		<td colspan="2" align="center"> 							
			<input type="submit" value="Thay đổi" class="content_button">
			&nbsp;&nbsp;
			<input type="reset" value="Reset" class="content_button"/>
		</td>			
	</tr>
</table>	
</form>
{include file='common/footer.tpl'}