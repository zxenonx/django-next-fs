from rest_framework import routers
from menu.viewsets import MenuViewSet

router = routers.SimpleRouter()
router.register(r'menus,', MenuViewSet, basename='menus')

urlpatterns = router.urls