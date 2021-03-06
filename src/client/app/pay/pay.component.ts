import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MerchantService, WeixinService } from '../service/index';

/**
 * This class represents the lazy loaded MerchantComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-pay',
  templateUrl: 'pay.component.html',
  styleUrls: ['pay.component.css'],
})

export class PayComponent implements OnInit {
  amount: any;

  merchantid: string;
  errorMessage: string;
  merchant: any = {};

  maskshow: number = 0;

  constructor(public merchantService: MerchantService, public weixinService: WeixinService,
  public route: ActivatedRoute, public router: Router) {
    this.merchantid = this.merchantService.merchantid;
    if (!this.merchantid) this.router.navigate(['/']);

    // var url = encodeURIComponent(location.origin+'/pay');
    // var url = encodeURIComponent(location.href.split('#')[0]);
    // this.weixinService.config(url);
  }

  /**
   * Get the merchants OnInit
   */
  ngOnInit() {
      this.getMerchantlist();
  }

  /**
   * Handle the MerchantService observable
   */
  getMerchantlist() {
    this.merchantService.getMerchantlist()
                     .subscribe(
                        res => {
                          if (!res.error) {
                            for (let index in res.merchants) {
                              if (res.merchants[index].id == this.merchantid) this.merchant = res.merchants[index];
                            }
                          }
                        },
                        error => {
                          this.errorMessage = <any>error;
                        }
                     );
  }

  //商家付款
  merchantPay() {
    //验证是否是数字
    var reg = /^((((0.)|([1-9][0-9]*.))[0-9]{1,2})|([1-9][0-9]*))$/;
    if (!reg.test(this.amount)) {
      alert('请输入正确的付款金额！');
      return;
    }

    this.maskshow = 1;

    this.merchantService.amount = this.amount;
    this.weixinService.wxpay(this.amount, this.merchantid);
  }

  //买单完成？回到首页
  paySuccess() {
    this.router.navigate(['/']);
  }

  //遇到问题？重新买单
  payFail() {
    this.amount = '';
    this.maskshow = 0;

    this.router.navigate(['/pay']);
  }
}
