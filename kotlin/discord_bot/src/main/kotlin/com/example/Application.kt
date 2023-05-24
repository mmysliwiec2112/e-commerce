package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import com.example.plugins.*
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent

suspend fun main() {
    val kord = Kord("your_token")
    val categoriesList = listOf<Category>(
        Category(1, "Science-fiction", listOf("Solaris", "Space Oddysey", "Space Trilogy")),
        Category(2, "Philosophy", listOf("Republic", "Leviathan", "Either-Or")),
        Category(3, "Computer Science", listOf("The Art of Computer Programming", "Things a Computer Scientist Rarely Talks About", "C Programming Language"))
    )

    kord.on<MessageCreateEvent> {
        if (message.author?.isBot != false) return@on
        if (message.content == "!help") message.channel.createMessage("commmands:\n" +
                "!help - prints all of the commands\n" +
                "!categories - prints the list of the categories\n" +
                "!category [X] - prints all of the books in specified category"
        )
        if (message.content == "!categories")
        {
            var printString = ""
            categoriesList.forEach { category -> printString += "${category.id}Name: ${category.name}\n" }
            message.channel.createMessage(printString)
        }
        if (message.content.startsWith("!category"))
        {
            val regex = Regex("!category (.+)")
            val result = regex.find(message.content)

            if (result != null){
                val categoryName = result.groupValues[1]
                var category = categoriesList.find { it.name == categoryName }
                message.channel.createMessage("List of items in category $categoryName:\n ${category?.books}")
            }
            else message.channel.createMessage("Wrong category")
        }
    }

    kord.login {
        // we need to specify this to receive the content of messages
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}

fun Application.module() {
    configureRouting()
}

data class Category(val id: Int, var name: String, val books: List<String>)
