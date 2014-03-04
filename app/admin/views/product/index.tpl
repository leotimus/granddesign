{include file='common/header.tpl'}

<form name="frmNews" method="post" action="{$smarty.const.HOST_ADMIN}/product">
<table width="100%" border="0" cellpadding="1" cellspacing="1">
    <tr>
		<td align="center" class="lable_list">Danh sách công trình</td>
		<td align="right"></td>
    </tr>
	<tr>
		<td colspan="2">
			<table width="100%" border="1" cellpadding="2" cellspacing="1">
        		<tr class="label_title">
          			<td align="center" width="3%" valign="top">
						<input type="checkbox" name="checkAll" value="" onClick="checkBoxAll(this.form, 'txtCheckBoxId[]', this.checked);"  width="1px" height="1px"/>
					</td>					
          			<td align="center" valign="top">Tên công trình</td>	
					<td align="center" valign="top">Tên category</td>
					<td align="center" valign="top">Khách hàng</td>					
					<td align="center" valign="top">Địa chỉ</td>
					<td align="center" valign="top">Diện tích</td>
					<td align="center" valign="top">Thời gian</td>
					<td align="center" valign="top">Hình ảnh</td>
					<td align="center" valign="top">Vị trí</td>	
									
        		</tr>
				{foreach key=i item=row from=$arrList}		
				<tr class="{cycle values="content_odd,content_even"}">		
					<td width="3%" align="center" valign="top">
						<input type="checkbox" name="txtCheckBoxId[]" value="{$row.id}" id="idCheck"/>
					</td>
					<td width="35%" valign="top">	 
					&nbsp;<a href="{$smarty.const.HOST_ADMIN}/product/edit?id={$row.id}" class="ahref">{$row.product_name}</a>
					</td>
					<td valign="top" width="10%" >
							{$row.category_name}
					</td>					
					<td width="15%" valign="top">
							{$row.investors}
					</td>
					<td width="15%" valign="top">
							{$row.address}
					</td>
					<td width="25%" valign="top">
							{$row.unbuilt_area}
					</td>
					<td width="25%" valign="top">
							{$row.time_finish}
					</td>
					<td valign="top">
						<a href="{$smarty.const.HOST_ADMIN}/product/images?id={$row.id}" class="ahref">Hình ảnh ({$row.countImages})</a>
					</td>
					<td width="5%" valign="top">
							{$row.sort}
					</td>								
				</tr>
				{/foreach}
				
      		</table>
			{paging total=$intTotal offset=$intOffset limit=$intLimit params=0}
		</td>
    </tr>
	<tr>
		<td colspan="2">
			<table width="100%" border="0" cellpadding="1" cellspacing="1">
        		<tr>
          			<td align="right" width="40%" valign="top">						
		  	  			<input type="button" name="btAddNew" class="content_button" value="Thêm mới" onClick="javascript: actionAddNew(this.form,'{$smarty.const.HOST_ADMIN}/product/add');"/>
		 				&nbsp;&nbsp;&nbsp;
		   				<input type="button" name="btDelete" class="content_button" value="Xóa" onClick="javascript:confirmDelete(this.form,'Vui lòng chọn một record','Bạn có chắc là muốn xóa?')"/>	  
		  			</td>
        		</tr>
      		</table>
		</td>
    </tr>	
</table>
</form>

{include file='common/footer.tpl'}