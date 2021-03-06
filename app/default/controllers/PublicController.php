<?php
class PublicController extends Zend_Controller_Action
{
	
    public function indexAction()
    {
		include_once('common/header.php');
		include_once('common/panel.php');
		$objProduct	= new Product();
		$indexPicture = new Picture();
		$this->view->sliderPics = $indexPicture->getListSliderPictures();
		$this->view->topOne = $objProduct->getTopProductByDisplaySizeAndCategory(22, false);
		$this->view->topTwo = $objProduct->getTopProductByDisplaySizeAndCategory(21, false);
		$this->view->topThree = $objProduct->getTopProductByDisplaySizeAndCategory(11, false);
		$this->view->otherProducts = $objProduct->getTopProductByDisplaySizeAndCategory(0, true);
    }
	
	
	public function aboutAction()
	{
		include_once('common/header.php');
		$objConfig	= new Config();
		$arrConfig	= $objConfig->getConfig('ABOUT');
		$this->view->arrConfig		= $arrConfig;
		$arrImage		= $objCategory->getImages();
		$this->view->arrImage	= $arrImage;
		$arrTemp		= $objConfig->getAllInfo();
		$arrInfoHCM		= array();
		$arrInfoHN		= array();
		foreach($arrTemp as $rRows)
		{
			if($rRows['type']==0)
				$arrInfoHCM[]	= $rRows;
			else
				$arrInfoHN[]	= $rRows;
		}
		$this->view->arrInfoHCM	= $arrInfoHCM;
		$this->view->arrInfoHN	= $arrInfoHN;
	}
	
	public function contactAction()
	{
		include_once('common/header.php');
		$arrImage		= $objCategory->getImages();
		$this->view->arrImage	= $arrImage;
	}
	
	public function serviceAction()
	{
		include_once('common/header.php');
		$arrImage		= $objCategory->getImages();
		$this->view->arrImage	= $arrImage;
		$objService		= new Service();
		$arrService		= $objService->getListServiceAdmin(0,20);
		$this->view->arrService	= $arrService;
	}
	
	public function servicedetailAction()
	{
		include_once('common/header.php');
		$objRequest = $this->_request;
		$iShop			= $objRequest->getParam('id', 0);
		$iDetailID		= $objRequest->getParam('proid', 0);
		$arrImage		= $objCategory->getImages();
		$this->view->arrImage	= $arrImage;
		$objService		= new Service();
		$arrService		= $objService->getListServiceAdmin(0,20, $iShop);
		$this->view->arrService	= $arrService;
		$arrDetail		= $objService->getServiceAdmin($iDetailID);
		$this->view->arrDetail	= $arrDetail;
	}

	/*
	 * Should:
	 * + Return the project which has greatest number of view_count and its represent 2x2 image
	 * + Return projects which have number of view_count at 2nd and 3rd position and their 2x1 image
	 * + Return all projects which orders by date_create (do not count 3 top view_count project)
	 */
	public function projectsAction()
	{
		include_once('common/header.php');
		include_once('common/panel.php');
		$requestURI = $_SERVER['REQUEST_URI'];
		$groupParam = Utils::decodeProjectCategorySEOLink($requestURI);
		$catId = $groupParam[2];
		$productsArray = array();
		if ($catId > 0) {
			$objProduct	= new Product();
			$projectsByCat = $objProduct->getProductsByCat($catId);
			$this->view->topOne = $projectsByCat[0];
			$this->view->topTwo = $projectsByCat[1];
			$this->view->topThree = $projectsByCat[2];
			$this->view->otherProjects = $projectsByCat[3];
		} else {
			$this->_redirect(HOST);
		}
	}
	
	public function projectdesignAction()
	{
		include_once('common/header.php');
		$objRequest = $this->_request;
		$requestURI = $_SERVER['REQUEST_URI'];
		$groupParam = Utils::decodeProjectDesignSEOLink($requestURI);
		$projectId = $groupParam[2];
		if($projectId > 0)
		{
			$objProduct	= new Product();
			$objProduct->updateProductViewCount($projectId, 0);
			$this->view->productDetails = $objProduct->getProductInfoByIndex($projectId);
			$this->view->productImages = $objProduct->getProductDetailImages($projectId);
		} else {
			$this->_redirect(HOST);
		}
	}
	
/*
* News (Tin tuc)
*/
	public function newsAction() {
		include_once ('common/header.php');	
		include_once('common/panel.php');
		$objNews = new News();		
		$arrList = $objNews->getListNewsAdmin(0, 10, 1);
		$this->view->arrList = $arrList ['result'];
		$this->view->intTotal = $arrList ['total'];		
	}

	public function readnewsAction() {
		include_once('common/header.php');
		include_once('common/panel.php');
		$news = new News();
		$requestURI = $_SERVER['REQUEST_URI'];
		$newstypeStr = "tin-tuc";
	    if (strpos($requestURI, 'phong-thuy') !== false) {
            $newstypeStr = "phong-thuy";
        }
		$groupParam = Utils::decodeNewsSEOLink($requestURI, $newstypeStr);
		$newsId = $groupParam[2];
		if (isset($newsId)) {
			$news->updateNewsViewCount($newsId, 0);
			$newsInfo = $news->getNewsById($newsId);
			$this->view->newsInfo = $newsInfo;
		} else {
			$this->_redirect(HOST . 'tin-tuc/');
		}
	}

/*
* Fengshui (Phong Thuy)
*/
	public function fengshuiAction() {
		include_once ('common/header.php');	
		include_once('common/panel.php');
		$objNews = new News();		
		$arrList = $objNews->getListNewsAdmin(0, 10, 2);
		$this->view->arrList = $arrList ['result'];
		$this->view->intTotal = $arrList ['total'];		
	}
}

