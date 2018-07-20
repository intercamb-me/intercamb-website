var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { ClientService } from 'app/services/client.service';
import { AlertService } from 'app/services/alert.service';
var SearchAddressComponent = /** @class */ (function () {
    function SearchAddressComponent(clientService, alertService, ngbActiveModal) {
        this.clientService = clientService;
        this.alertService = alertService;
        this.ngbActiveModal = ngbActiveModal;
    }
    SearchAddressComponent.prototype.close = function () {
        this.ngbActiveModal.dismiss();
    };
    SearchAddressComponent.prototype.searchAddress = function () {
        var _this = this;
        this.clientService.searchAddress(this.zipCode).subscribe(function (zipCodeAddress) {
            _this.ngbActiveModal.close(zipCodeAddress);
            _this.alertService.success('Endereço encontrado! Os campos foram preenchidos automaticamente.');
        }, function (err) {
            _this.alertService.apiError(null, err, 'Não foi possível buscar o endereço, por favor tente novamente mais tarde!');
        });
    };
    SearchAddressComponent = __decorate([
        Component({
            selector: 'app-search-address',
            templateUrl: './search-address.component.html',
        }),
        __metadata("design:paramtypes", [ClientService, AlertService, NgbActiveModal])
    ], SearchAddressComponent);
    return SearchAddressComponent;
}());
export { SearchAddressComponent };
//# sourceMappingURL=search-address.component.js.map