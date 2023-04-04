package controllers

import models.{CartItem, ProductItem}
import play.api.libs.json._
import play.api.mvc._

import javax.inject._
import scala.collection.mutable


@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private val cart = new mutable.ListBuffer[CartItem]()
  cart += CartItem(0, List(1, 2, 3))
  cart += CartItem(1, List(4, 2, 3))
  cart += CartItem(2, List(5, 24, 31))
  implicit var cartJson: OFormat[CartItem] = Json.format[CartItem]
  implicit val newCartJson: OFormat[NewCartItem] = Json.format[NewCartItem]

  def getAll(): Action[AnyContent] = Action {
    if (cart.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(cart))
    }
  }

  def getById(cartId: Int): Action[AnyContent] = Action {
    val foundProduct = cart.find(_.id == cartId)
    foundProduct match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(cartId: Int, oldProductId: Int, newProductId: Int): Action[AnyContent] = Action {
    val foundCart = cart.find(_.id == cartId)
    foundCart match {
      case Some(item) =>
        var newElements = item.elements
        val productId = item.elements.indexOf(oldProductId)
        if (productId >= 0) {
          newElements = item.elements.updated(productId, newProductId)
        }
        cart.update(cartId, CartItem(cartId, newElements))
        Ok("Product updated")
      case None => NotFound
    }
  }

  def delete(cartId: Int): Action[AnyContent] = Action {
    val foundCart = cart.find(_.id == cartId)
    foundCart match {
      case Some(item) =>
        for (i <- cartId until cart.length) {
          val updatedCart = cart(i).copy(id = i - 1)
          cart.update(i, updatedCart)
        }
        cart.remove(cartId)
        Ok("Product removed")
      case None => NotFound
    }
  }

  def addNew(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    System.out.print(request)
    val jsonObject = content.asJson
    val cartItem: Option[NewCartItem] =
      jsonObject.flatMap(
        Json.fromJson[NewCartItem](_).asOpt
      )
    cartItem match {
      case Some(newItem) =>
        val nextId = cart.map(_.id).max + 1
        val toBeAdded = CartItem(nextId, newItem.elements)
        cart += toBeAdded
        Created(Json.toJson(newItem.elements))
      case None =>
        Created(Json.toJson(jsonObject))
    }
  }

  case class NewCartItem(id: Int, elements: List[Int])
}
