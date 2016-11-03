'use strict';

angular.module('directives')

    .directive("a", function urlFragmentDirective($location, $anchorScroll) {

            return {
                compile: compile,
                restrict: "E"
            };

            function compile(tElement, tAttributes) {

                if (tAttributes.target) {

                    return;
                }

                var href = (tAttributes.href || tAttributes.ngHref || "");

                if (!href) {

                    return;
                }

                if (href.charAt( 0 ) !== "#") {

                    return;
                }

                if (href.charAt( 1 ) === "/") {

                    return;
                }

                return link;
            }

            function link(scope, element, attributes) {

                element.on("click", function handleClickEvent(event) {

                    if (event.ctrlKey || event.metaKey || event.shiftKey
                        || event.which == 2 || event.button == 2) {

                        return;
                    }

                    var href = element.attr("href");

                    if (href.indexOf("#/") === 0) {

                        return;
                    }

                    event.preventDefault();

                    var fragment = href.slice(1);

                    if (fragment === $location.hash()) {

                        return $anchorScroll();
                    }

                    $location.hash(fragment);

                    scope.$apply();
                });
            }
        }
    );