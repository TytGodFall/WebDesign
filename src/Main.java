import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        int temp = 0;

        Scanner scnr = new Scanner(System.in);
         System.out.print("Enter a number: ");
        temp = scnr.nextInt();

        System.out.print("is this your number? : "+temp);
    }
}
