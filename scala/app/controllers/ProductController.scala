package controllers

import models.ProductItem
import play.api.libs.json._
import play.api.mvc._

import javax.inject._
import scala.collection.mutable


@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  implicit var product = new mutable.ListBuffer[ProductItem]()
  product += ProductItem(0, "ksiazka", "ksiazka o ksiazkach", 15)
  product += ProductItem(1, "ksiazka2", "ksiazka o ksiazkach 2", 15)
  product += ProductItem(2, "ksiazka3", "ksiazka o ksiazkach 3", 15)
  implicit var productJson: OFormat[ProductItem] = Json.format[ProductItem]
  implicit val newProductJson: OFormat[NewProductItem] = Json.format[NewProductItem]

  def getAll(): Action[AnyContent] = Action {
    if (product.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(product))
    }
  }

  def getById(productId: Int): Action[AnyContent] = Action {
    val foundProduct = product.find(_.id == productId)
    foundProduct match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(productId: Int, productPrice: Int): Action[AnyContent] = Action {
    val foundProduct = product.find(_.id == productId)
    foundProduct match {
      case Some(item) =>
        product.update(productId, ProductItem(productId, item.title, item.description, productPrice))
        Ok("Product updated")
      case None => NotFound
    }
  }

  def delete(productId: Int): Action[AnyContent] = Action {
    val foundProduct = product.find(_.id == productId)
    foundProduct match {
      case Some(item) =>
        for (i <- productId until product.length){
          print(i)
          val updatedProduct = product(i).copy(id = i - 1)
          product.update(i, updatedProduct)
        }
        product.remove(productId)
        Ok("Product removed")
      case None => NotFound
    }
  }

  def addNew(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val productItem: Option[NewProductItem] =
      jsonObject.flatMap(
        Json.fromJson[NewProductItem](_).asOpt
      )
    productItem match {
      case Some(newItem) =>
        val nextId = product.map(_.id).max + 1
        val toBeAdded = ProductItem(nextId, newItem.title, newItem.description, newItem.price)
        product += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  case class NewProductItem(title: String, description: String, price: Int)
}
