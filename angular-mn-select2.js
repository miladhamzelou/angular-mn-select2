var mnSelect2 = angular.module('mn.select2', []);
mnSelect2.directive('select2LocalRemote', ['$timeout', function ($timeout) {
    function setOption(element, option) {
        if(!element.data('select2'))
            $timeout(function () {
                element.select2(option);
            }, 0);
    }
    return {
        restrict: 'A',
        scope: {
            select2LocalRemote: "=",
            item: "=ngModel",
            itemModel: "=selectModel"
        },
        link: function (scope, element, attrs) {
            scope.select2LocalRemote = scope.select2LocalRemote || {};
            scope.hasNgModel = !!attrs.ngModel;
            scope.hasItemModel = !!attrs.selectModel;
            var SelectAdapter = $.fn.select2.amd.require('select2/data/select');
            SelectAdapter.prototype.query = function (params, callback) {
                var data = [];
                var self = this;
                var $options = this.$element.children();
                $options.each(function () {
                    var $option = $(this);
                    if (!$option.is('option') && !$option.is('optgroup')) {
                        return;
                    }
                    var option = self.item($option);
                    var matches = self.matches(params, option);
                    if (matches !== null) {
                        var limitNumber = self.options.get('limitNumber');
                        (!limitNumber || limitNumber > data.length) && data.push(matches);
                    }
                });
                callback({
                    results: data
                });
            };

            scope.select2LocalRemote && (scope.select2LocalRemote.reset = scope.select2LocalRemote.reset || function () {
                    setOption(element, scope.select2LocalRemote);
                });

            scope.select2LocalRemote && (scope.select2LocalRemote.language = scope.select2LocalRemote.language || 'fa');

            if (scope.select2LocalRemote && scope.select2LocalRemote.ajax) {

                scope.select2LocalRemote.ajax.escapeMarkup = scope.select2LocalRemote.ajax.escapeMarkup
                    || function (markup) { return markup; };
            };

            element.on('select2:select', function (e) {
                if (scope.select2LocalRemote && scope.select2LocalRemote.ajax) {
                    scope.hasNgModel && !angular.isArray(scope.item) && (scope.item = e.params.data);
                    scope.hasItemModel &&
                    (angular.isArray(scope.itemModel) ? scope.itemModel.push(e.params.data) : (scope.itemModel = e.params.data));
                    scope.$apply();
                }

                var evtName = 'sn.select2.select';
                evtName += (scope.select2LocalRemote && scope.select2LocalRemote.key) ? ':' + scope.select2LocalRemote.key : '';
                scope.$emit(evtName);
            });
            element.on('select2:unselect', function (e) {
                if (scope.select2LocalRemote && scope.select2LocalRemote.ajax) {
                    scope.hasNgModel && !angular.isArray(scope.item) && (scope.item = undefined);
                    if (scope.hasItemModel) {
                        if (angular.isArray(scope.itemModel)) {
                            var id = e.params.data.id;
                            scope.itemModel = scope.itemModel.filter(function (item) {
                                return item.id != id
                            });
                        } else {
                            scope.itemModel = undefined;
                        }
                    }
                    scope.$apply();
                }

                var evtName = 'sn.select2.unselect';
                evtName += (scope.select2LocalRemote && scope.select2LocalRemote.key) ? ':' + scope.select2LocalRemote.key : '';
                scope.$emit(evtName);
            });

            scope.hasNgModel && scope.$watch('item', function (newVal, oldVal) {
                if (newVal && !oldVal) {
                    setOption(element, scope.select2LocalRemote);
                }
            });

            setOption(element, scope.select2LocalRemote);
        }
    }
}]);