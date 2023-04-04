package controllers

import models.{CategoryItem, ProductItem}
import play.api.libs.json._
import play.api.mvc._

import javax.inject._
import scala.collection.mutable


@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {
  private var category = new mutable.ListBuffer[CategoryItem]()
  category += CategoryItem(0, "sci-fi", List("ksiazka3"))
  category += CategoryItem(1, "research", List("ksiazka2"))
  category += CategoryItem(2, "fantasy", List("ksiazka1"))
  implicit var categoryJson: OFormat[CategoryItem] = Json.format[CategoryItem]
  implicit val newCategoryJson: OFormat[NewCategoryItem] = Json.format[NewCategoryItem]

  def getAll(): Action[AnyContent] = Action {
    if (category.isEmpty) {
      NoContent
    } else {
      Ok(Json.toJson(category))
    }
  }

  def getById(categoryId: Int): Action[AnyContent] = Action {
    val foundProduct = category.find(_.id == categoryId)
    foundProduct match {
      case Some(item) => Ok(Json.toJson(item))
      case None => NotFound
    }
  }

  def update(categoryId: Int, oldName: String, newName: String): Action[AnyContent] = Action {
    val foundProduct = category.find(_.id == categoryId)
    foundProduct match {
      case Some(item) =>
        var newElements = item.elements
        val productId = item.elements.indexOf(oldName)
        if (productId >= 0) {
          newElements = item.elements.updated(productId, newName)
        }
        category.update(categoryId, CategoryItem(categoryId, item.name, newElements))
        Ok("Product updated")
      case None => NotFound
    }
  }

  def delete(categoryId: Int): Action[AnyContent] = Action {
    val foundProduct = category.find(_.id == categoryId)
    foundProduct match {
      case Some(item) =>
        for (i <- categoryId until category.length){
          print(i)
          val updatedProduct = category(i).copy(id = i - 1)
          category.update(i, updatedProduct)
        }
        category.remove(categoryId)
        Ok("Product removed")
      case None => NotFound
    }
  }

  def addNew(): Action[AnyContent] = Action { implicit request =>
    val content = request.body
    val jsonObject = content.asJson
    val productItem: Option[NewCategoryItem] =
      jsonObject.flatMap(
        Json.fromJson[NewCategoryItem](_).asOpt
      )
    productItem match {
      case Some(newItem) =>
        val nextId = category.map(_.id).max + 1
        val toBeAdded = CategoryItem(nextId, newItem.name, newItem.elements)
        category += toBeAdded
        Created(Json.toJson(toBeAdded))
      case None =>
        BadRequest
    }
  }

  case class NewCategoryItem(id: Int, name: String, elements: List[String])
}
