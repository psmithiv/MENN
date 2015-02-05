/**
 * Created by Paul on 1/21/2015.
 */
var gamesViewController = angular.module('gamesViewController', []);

gamesViewController.controller('gamesViewController', [
    '$scope',
    'gamesService',
    'modelLocator',
    '$timeout',

    function ($scope, gamesService, modelLocator, $timeout) {
        console.log('gamesViewController');

        /**
         * private
         */
        var gridApi;

        /**
         * @public
         * @param game
         */
        var editGame = function (game) {
            gamesService.getGameById(game);
        };

        /**
         * @public
         */
        var saveGame = function () {
            if (modelLocator.editGame._id) {
                gamesService.putGame(modelLocator.editGame);
            } else {
                gamesService.postGame(modelLocator.editGame);
            }
        };

        /**
         * @public
         * @param game
         */
        var deleteGame = function (game) {
            gamesService.deleteGame(game);
        };

        /**
         *
         * @param file
         */
        var uploadGameImage = function (file) {
            gamesService.uploadGameImage(file);
        };

        /**
         * @public
         */
        var newGame = function () {
            gamesService.newGame();
        };

        /**
         * @private
         * @param newValue
         * @param oldValue
         */
        var editGameChanged = function (newValue, oldValue) {
            if (newValue == oldValue)
                return;

            if (modelLocator.editGame) {
                //make sure grid has updated by forcing a digest before setting the selected row
                $timeout(function () {
                    var listItem = _.find(modelLocator.games, {_id: modelLocator.editGame._id});
                    gridApi.selection.selectRow(listItem);
                })
            } else {
                gridApi.selection.clearSelectedRows();
            }
        };

        var resetForm = function () {
            if(modelLocator.editGame._id) {
                editGame({_id: modelLocator.editGame._id});
            } else {
                newGame();
            }
        };

        /**
         * @public
         * @param $event
         */
        //TODO: Wrap date picker in a directive and get this config code out of this controller -psmithiv
        var open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.dateOptions.opened = true;
        };

        /**
         * @private
         * @param gridApi
         */
        //TODO: Wrap ui-grid in a directive and get this config code out of this controller -psmithiv
        var registerGridApi = function (_gridApi) {
            gridApi = _gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, rowSelectionChanged);
        };

        /**
         * %private
         * @param row
         */
        //TODO: Wrap ui-grid in a directive and get this config code out of this controller -psmithiv
        var rowSelectionChanged = function (row) {
            if (!modelLocator.editGame || row.entity._id != modelLocator.editGame._id)
                editGame(row.entity);
        };

        /**
         * @private
         * @returns {string}
         */
        //TODO: Wrap ui-grid in a directive and get this config code out of this controller -psmithiv
        var rowTemplate = function () {
            return '<div style="background-color: white" ng-click="grid.appScope.fnOne(row)" ng-repeat="col in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell custom-row" ui-grid-cell></div>';
        };

        /**
         * @private
         * @returns {string}
         */
        //TODO: Wrap ui-grid in a directive and get this config code out of this controller -psmithiv
        var deleteColumnCell = function () {
            return '<span class="delete-icon glyphicon glyphicon-trash" ng-click="getExternalScopes().removeRow($event, row)"></span>';
        }

        //Expose $scope properties
        $scope.modelLocator = modelLocator;

        //TODO: Wrap date picker in a directive and get this config code out of this controller -psmithiv
        $scope.dateOptions = {
            showWeeks: false,
            opened: false
        };

        //TODO: Wrap ui-grid in a directive and get this config code out of this controller ??? -psmithiv
        $scope.gridOptions = {
            rowHeight: 50,
            columnDefs: [
                {field: 'title', displayName: 'Title', cellClass: 'custom-cell', headerCellClass: 'custom-header-cell'},
                {
                    field: 'developers',
                    displayName: 'Developer(s)',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    field: 'publishers',
                    displayName: 'Publishers(s)',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    field: 'platforms',
                    displayName: 'Platform(s)',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    field: 'releaseDates',
                    displayName: 'Release Date(s)',
                    cellFilter: 'date:dateMedium',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    field: 'genres',
                    displayName: 'Genre(s)',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    field: 'awards',
                    displayName: 'Awards',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    field: 'summary',
                    displayName: 'Summary',
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell'
                },
                {
                    name: '_delete',
                    displayName: '',
                    enableFiltering: false,
                    enableColumnMenu: false,
                    enableSorting: false,
                    cellClass: 'custom-cell',
                    headerCellClass: 'custom-header-cell',
                    cellTemplate: deleteColumnCell(),
                    maxWidth: 50
                }
            ],
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            enableHiding: false,
            multiSelect: false,
            noUnselect: true,
            onRegisterApi: registerGridApi,
            rowTemplate: rowTemplate()
        };

        //TODO: Wrap ui-grid in a directive and get this config code out of this controller -psmithiv
        $scope.removeRow = function ($event, row) {
            $event.stopImmediatePropagation();
            $event.preventDefault();

            deleteGame(row.entity);
        };

        //Expose $scope methods
        $scope.editGame = editGame;
        $scope.saveGame = saveGame;
        $scope.deleteGame = deleteGame;
        $scope.uploadGameImage = uploadGameImage;
        $scope.newGame = newGame;
        $scope.resetForm = resetForm;
        //TODO: Wrap date picker in a directive and get this config code out of this controller -psmithiv
        $scope.open = open;

        //add watchers
        $scope.$watch(function () {
            return modelLocator.editGame;
        }, editGameChanged);

        /**
         * Constructor
         */
        (function () {
            var success = function (result) {
                $scope.gridOptions.data = modelLocator.games;
            };

            //load games data
            gamesService.getGames()
                .then(success);
        }());
    }
])